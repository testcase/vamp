/// @file
///	@ingroup 	minexamples
///	@copyright	Copyright 2018 The Min-DevKit Authors. All rights reserved.
///	@license	Use of this source code is governed by the MIT License found in the License.md file.
///

#include "c74_min.h"
#include <vamp-hostsdk/PluginHostAdapter.h>
#include <vamp-hostsdk/PluginInputDomainAdapter.h>
#include <vamp-hostsdk/PluginLoader.h>

using namespace c74::min;
using namespace c74::min::lib;
using Vamp::Plugin;
using Vamp::PluginHostAdapter;
using Vamp::RealTime;
using Vamp::HostExt::PluginLoader;
using Vamp::HostExt::PluginWrapper;
using Vamp::HostExt::PluginInputDomainAdapter;
static double
toSeconds(const RealTime &time);


static double
toSeconds(const RealTime &time)
{
    return time.sec + double(time.nsec + 1) / 1000000000.0;
}

enum Verbosity {
    PluginIds,
    PluginOutputIds,
    PluginInformation,
    PluginInformationDetailed
};


class vamp_host : public object<vamp_host> {
public:
    MIN_DESCRIPTION	{"Post to the Max Console."};
    MIN_TAGS		{"utilities"};
    MIN_AUTHOR		{"Cycling '74"};
    MIN_RELATED		{"print, jit.print, dict.print"};

    inlet<>  input	{ this, "(bang) post greeting to the max console" };
    outlet<> analysis	{ this, "(anything) output the message which is posted to the max console" };
    outlet<> pluginfo    { this, "(anything) output the message which is posted to the max console" };

    
    argument<symbol> m_name_arg {this, "buffer-name", "Initial buffer~ from which to read.",
        MIN_ARGUMENT_FUNCTION {
            m_buffer.set(arg);
        }
    };
    
    buffer_reference m_buffer { this,
        MIN_FUNCTION {
            return {};
        }
    };
    
    attribute<int> block_size { this, "block_size", 1024,
        description {
            "Block size for processing. -1 means use whole buffer size"
        }
    };
    
    message<> setparam {this, "setparam", "Set parameter",
        MIN_FUNCTION {
            if(m_plugin) {
                bool param_exists = false;
                Plugin::ParameterList params = m_plugin->getParameterDescriptors();
                
                string param = args[0];
                double value = args[1];
                //check if param exist
                for(Plugin::ParameterList::iterator it = params.begin();it!=params.end();++it) {
                    Plugin::ParameterDescriptor desc = *it;
                    if(desc.identifier == param) {
                        param_exists = true;
                        break;
                    }
                }
                
                if(!param_exists) {
                    cerr << "parameter with that name does not exist" << endl;
                     goto out;
                }
                
                m_plugin->setParameter(param, value);
         
            } else {
                cerr << "no vamp plugin loaded" << endl;
            }
        out:
            return {};
        }
    };
    
    message<> getparam {this, "getparam", "Get parameter",
        MIN_FUNCTION {
            if(m_plugin) {
                bool param_exists = false;
                string param = args[0];
                
              
                Plugin::ParameterList params = m_plugin->getParameterDescriptors();
 
                //check if param exist
                for(Plugin::ParameterList::iterator it = params.begin();it!=params.end();++it) {
                    Plugin::ParameterDescriptor desc = *it;
                    if(desc.identifier == param) {
                        param_exists = true;
                        break;
                    }
                }
                
                if(!param_exists) {
                    cerr << "parameter with that name does not exist" << endl;
                    goto out;
                }

                float val = m_plugin->getParameter(param);
                pluginfo.send("param", param, val);
         
            } else {
                cerr << "no vamp plugin loaded" << endl;
            }
        out:
            return {};
            
        }
    };
    
    

    message<> plug {this, "plug", "Load plugin by name",
        MIN_FUNCTION {
            string plug = args[0];
            double sr = 48000.0;
          
            PluginLoader *loader = PluginLoader::getInstance();
            //if can't get path assume plug does not exist and generate error.
            if(loader->getLibraryPathForPlugin(plug).size() == 0) {
                cerr << "vamp plugin does not exist or can't be found" << endl;
                return {};
            }
            
            buffer_lock<false> b {m_buffer};

            if(b.valid()) {
                sr = b.samplerate();
            }
            
            Plugin *plugin = loader->loadPlugin(plug, sr, PluginLoader::AdapterFlags::ADAPT_ALL);
            
            if(!plugin) {
                cerr << "failed to load plugin for some reason" << endl;
                return {};
            }
        
            m_plugin.reset(plugin);
            m_plugid = plug;
            pluginfo.send("plug", m_plugid);

            return {};
        }
    };
    
    message<> getprograms { this, "getprograms", "Get Programs",
        
        MIN_FUNCTION {
            if(m_plugin) {
                dict program_dict { symbol(true) };

                Plugin::ProgramList programs = m_plugin->getPrograms();

                for(auto i=0;i<programs.size();i++) {
                    program_dict[i] = programs[i];
                }
                
            } else {
                cerr << "no vamp plugin loaded" << endl;
            }
            
            return {};
        }
        
    };
    
    message<> getparams { this, "getparams", "Get Params",
        MIN_FUNCTION {
            if(m_plugin) {

                dict param_dict{ symbol(true) };
                from_params(param_dict);

                pluginfo.send("params", "dictionary", param_dict.name());
         
            } else {
                cerr << "no vamp plugin loaded" << endl;
            }
            
            return {};
        }
    };
    
    message<> getinfo { this, "getinfo", "Get info",
        MIN_FUNCTION {
            if(m_plugin) {

                dict infodict { symbol(true) };
                infodict["identifier"] = m_plugin->getIdentifier();
                infodict["name"] = m_plugin->getName();
                infodict["api"] =  (int)m_plugin->getVampApiVersion();
                infodict["description"] = m_plugin->getDescription();
                infodict["maker"] = m_plugin->getMaker();
                infodict["copyright"] = m_plugin->getCopyright();
                infodict["version"] = m_plugin->getPluginVersion();
                pluginfo.send("info", "dictionary", infodict.name());
            } else {
                cerr << "no vamp plugin loaded" << endl;
            }
            return {};
        }
    };

    
    message<> getoutputs { this, "getoutputs", "Get outputs",
        MIN_FUNCTION {
            if(m_plugin) {
                dict output_dict { symbol(true) };
                from_outputs(output_dict);
                pluginfo.send("outputs", "dictionary", output_dict.name());
                
            } else {
                cerr << "no vamp plugin loaded" << endl;
            }
            return {};
        }
    };
    
    message<> plugins { this, "plugins", "List vamp plugins",
        MIN_FUNCTION {
            PluginLoader *loader = PluginLoader::getInstance();
            
            vector<PluginLoader::PluginKey> plugins = loader->listPlugins();
            
            if(plugins.size() == 0) {
                cerr << "no vamp plugins found" << endl;
            } else {
                for (std::vector<PluginLoader::PluginKey>::iterator it = plugins.begin() ; it != plugins.end(); ++it) {
                    pluginfo.send("plug", *it);
                }
            }
            
            return {};
        }
    };

    // respond to the bang message to do something
    message<> bang { this, "bang", "Process buffer through plugin",
        MIN_FUNCTION {
            if(m_plugin) {
        
                buffer_lock<false> b {m_buffer};

                //if buffer sample rate has changed we need to reload plugin and initialize
                if(m_plugin->getInputSampleRate() != (float)b.samplerate()) {
                    PluginLoader *loader = PluginLoader::getInstance();
                    //if can't get path assume plug does not exist and generate error.
                    if(loader->getLibraryPathForPlugin(m_plugid).size() == 0) {
                        cerr << "vamp plugin does not exist or can't be found" << endl;
                        return {};
                    }


                    Plugin *plugin = loader->loadPlugin(m_plugid, b.samplerate(), PluginLoader::AdapterFlags::ADAPT_ALL);

                    if(!plugin) {
                        cerr << "failed to load plugin for some reason" << endl;
                        return {};
                    }

                    m_plugin.reset(plugin);
                        //cout << "ready to run plugin: \"" << plugin->getIdentifier() << "\"..." << endl;

                }
                
                
                
                int buffer_framecount = b.frame_count();
                int channels = b.channel_count();
                int real_block_size = block_size;
                
                if(real_block_size < 0) {
                    real_block_size = buffer_framecount;
                } else if(real_block_size == 0) {
                    real_block_size = 1;
                }
                
                int step_size = real_block_size;
                
                float **plugbuf = new float*[channels];
                for(auto c = 0;c<channels;++c) {
                    plugbuf[c] = new float[real_block_size + 2];
                }
                
                
                size_t current_block = 0;

                if(b.valid()) {
                    
                    RealTime rt;

                    PluginWrapper *wrapper = 0;
                    RealTime adjustment = RealTime::zeroTime;
                    Plugin::OutputList outputs = m_plugin->getOutputDescriptors();
                    Plugin::FeatureSet features;
   
                    std::map<std::string, dict> feature_dict_map;
                    std::map<std::string, size_t> feature_dict_indices;
                    dict features_dict { symbol(true) };
                

                    if (outputs.empty()) {
                        cerr << "ERROR: Plugin has no outputs!" << endl;
                        goto out;
                    }
                    
                    for(auto i=0;i<outputs.size();i++) {
                        feature_dict_map[outputs[i].identifier] = dict(symbol(true));
                        feature_dict_indices[outputs[i].identifier] = 0;
                    }

                    
                    if (!m_plugin->initialise(channels, step_size, real_block_size)) {
                        cerr << "ERROR: Plugin initialise (channels = " << channels
                             << ", step_size = " << step_size << ", block_size = "
                             << block_size << ") failed." << endl;
                        goto out;
                    }
                    
       
                    wrapper = dynamic_cast<PluginWrapper *>(m_plugin.get());
                    if (wrapper) {
                        
                        PluginInputDomainAdapter *ida =
                            wrapper->getWrapper<PluginInputDomainAdapter>();
                        if (ida) adjustment = ida->getTimestampAdjustment();
                    }
                    
                
                    do {
                        for (auto c = 0; c < channels; ++c) {
                            size_t pos = current_block*real_block_size;
                            for(auto j=0;j<real_block_size;j++) {
                                plugbuf[c][j] = b.lookup(j + pos, c);
                            }
                        }
                            
                        rt = RealTime::frame2RealTime(current_block, b.samplerate());
                            
                        features = m_plugin->process(plugbuf, rt);

                        from_features(feature_dict_map,
                                      feature_dict_indices,
                                      features, RealTime::realTime2Frame(rt + adjustment, (int)b.samplerate()),
                                      (int)b.samplerate() );
                                                    
                        current_block++;
                        
                    } while ( (buffer_framecount - (current_block*real_block_size)) >  block_size);
                    
                    for (auto c = 0; c < channels; ++c) {
                        size_t pos = current_block*real_block_size;
                        for(auto j=0;j<real_block_size;j++) {
                            if((pos + j) > buffer_framecount) {
                                plugbuf[c][j] = 0.0;
                            } else {
                                plugbuf[c][j] = b.lookup(j + current_block , c);
                            }
                        }
                    }
                    
                    rt = RealTime::frame2RealTime(current_block, b.samplerate());
                    
                    features = m_plugin->getRemainingFeatures();
                    if(!features.empty()) {
                        from_features(feature_dict_map, feature_dict_indices, features, RealTime::realTime2Frame(rt + adjustment, (int)b.samplerate()), (int)b.samplerate() );
                    }
                    
                    for(std::map<std::string, dict>::iterator it = feature_dict_map.begin(); it!=feature_dict_map.end();++it) {
                        std::string s = it->first;
                        features_dict[s] = it->second;
                    }

                    
                    pluginfo.send("features", "dictionary", features_dict.name());
                    

                    for(auto i=0;i<channels;i++) {
                        delete plugbuf[i];
                    }
                    
                    delete[] plugbuf;
                    m_plugin->reset();
                }
                
            } else {
                cerr << "no vamp plugin loaded" << endl;
            }
            
           out:
            return {};
        }
    };


    // post to max window == but only when the class is loaded the first time
    message<> maxclass_setup { this, "maxclass_setup",
        MIN_FUNCTION {
            return {};
        }
    };
    
private:
    std::unique_ptr<Plugin> m_plugin { nullptr };
    std::string m_plugid { nullptr };
    
    void from_outputs(dict& output_dict) {
        vector<string> samp_type = {"one", "fixed", "variable"};

        Plugin::OutputList outputs = m_plugin->getOutputDescriptors();

        for(Plugin::OutputList::iterator it = outputs.begin();it!=outputs.end();++it) {
            Plugin::OutputDescriptor desc = *it;
            dict outputdesc_dict { symbol(true) };
            bool binNamesBlank = true;

            outputdesc_dict["name"] = desc.name ;
            outputdesc_dict["description"] = desc.description;
            outputdesc_dict["unit"] = desc.unit;
            outputdesc_dict["hasFixedBinCount"] = desc.hasFixedBinCount;
            outputdesc_dict["binCount"] = (int)desc.binCount;

            std::vector<std::string> binNames = desc.binNames;

            //seems like sometimes binNames are empty.

            if(binNames.size() > 0) {
                for(auto i = 0;i<binNames.size();i++) {
                    if(binNames[i].size() > 0) {
                        binNamesBlank = false;
                    }
                }
            }

            if(binNames.size() > 0 && !binNamesBlank) {
                dict binnames_dict { symbol(true) };
                for(auto i=0;i<binNames.size();i++) {
                    binnames_dict[i] = binNames[i];
                }
                outputdesc_dict["binNames"] = binnames_dict;
            }

            outputdesc_dict["hasKnownExtents"] = desc.hasKnownExtents ;

            if(desc.hasKnownExtents) {
                outputdesc_dict["minValue"] = desc.minValue;
                outputdesc_dict["maxValue"] = desc.maxValue;
            }

            outputdesc_dict["isQuantized"] = desc.isQuantized;

            if(desc.isQuantized) {
                outputdesc_dict["quantizeStep"] = desc.quantizeStep;
            }


            outputdesc_dict["sampleType"] = desc.sampleType;
            outputdesc_dict["sampleRate"] = desc.sampleRate;
            outputdesc_dict["hasDuration"] =  desc.hasDuration;

            output_dict[desc.identifier] = outputdesc_dict;
        }
    }

    void from_params(dict& param_dict) {
        Plugin::ParameterList params = m_plugin->getParameterDescriptors();

        for(Plugin::ParameterList::iterator it = params.begin();it!=params.end();++it) {
            Plugin::ParameterDescriptor desc = *it;

            dict outputdesc { symbol(true) };

            outputdesc["name"] = desc.name ;
            outputdesc["description"] = desc.description;
            outputdesc["unit"] = desc.unit;
            outputdesc["minValue"] = desc.minValue;
            outputdesc["maxValue"] = desc.maxValue;
            outputdesc["defaultValue"] = desc.defaultValue;
            outputdesc["defaultValue"] = desc.defaultValue;
            outputdesc["quantizeStep"] = desc.quantizeStep;
            outputdesc["isQuantized"] = desc.isQuantized;

            if(desc.isQuantized) {
                std::vector<std::string> valueNames = desc.valueNames;
                dict valuenames { symbol(true) };

                if(valueNames.size() != 0) {
                    int j = 0;
                    for(std::vector<std::string>::iterator stit = valueNames.begin(); stit != valueNames.end(); ++stit) {
                        valuenames[j++] = *stit;
                    }

                }
                outputdesc["valueNames"] = valuenames;
            }

            param_dict[desc.identifier] = outputdesc;
        }
    }
    
    
    void from_features(std::map<std::string, dict>& feature_dict_map,
                       std::map<std::string, size_t>& feature_dict_indices,
                       Plugin::FeatureSet& feature_set,
                       int frame, int sr) {

        Plugin::OutputList outputs = m_plugin->getOutputDescriptors();
        
        for (Plugin::FeatureSet::iterator it = feature_set.begin() ; it != feature_set.end(); ++it) {
            Plugin::FeatureList flist = it->second;
            Plugin::OutputDescriptor desc = outputs[it->first];
           
            for(auto i=0;i<flist.size();i++) {
                const Plugin::Feature &f = flist[i];
                static int featureCount = -1;
                RealTime rt;
                bool haveRt = false;
                dict feature_dict { symbol(true) };//hold individual feature in feature list

                if (desc.sampleType == Plugin::OutputDescriptor::VariableSampleRate) {
                    rt = f.timestamp;
                    haveRt = true;
                } else if (desc.sampleType == Plugin::OutputDescriptor::FixedSampleRate) {
                    int n = featureCount + 1;
                    if (f.hasTimestamp) {
                        n = int(round(toSeconds(f.timestamp) * desc.sampleRate));
                    }
                    rt = RealTime::fromSeconds(double(n) / desc.sampleRate);
                    haveRt = true;
                    featureCount = n;
                }
    
                if (!haveRt) {
                    rt = RealTime::frame2RealTime(frame, sr);
                }
        
                feature_dict["timestamp"] = std::stod(rt.toString());
        
                feature_dict["hasDuration"] = f.hasDuration;
                
                if (f.hasDuration) {
                    rt = f.duration;
                    feature_dict["duration"] = std::stod(rt.toString());
    
                }
                
                if(f.label.size() > 0) {
                    feature_dict["label"] = f.label;//is this ever not blank?
                }
        
                dict values_dict { symbol(true) };
                std::vector<float> values = f.values;
                int v = 0;
                for(std::vector<float>::iterator vit = values.begin();vit != values.end();++vit) {
                    values_dict[v++] = *vit;
                }
                
                feature_dict["values"] = values_dict;

                size_t pos = feature_dict_indices[desc.identifier];
                feature_dict_map[desc.identifier][pos] = feature_dict;
                feature_dict_indices[desc.identifier] = pos + 1;

            }
            
        
            
        }
    }
};

MIN_EXTERNAL(vamp_host);

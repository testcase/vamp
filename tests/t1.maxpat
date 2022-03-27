{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 2,
			"revision" : 2,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 580.0, 135.0, 1616.0, 865.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"assistshowspatchername" : 0,
		"boxes" : [ 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-29",
					"items" : [ "getinfo", ",", "getoutputs", ",", "getparams" ],
					"maxclass" : "chooser",
					"multiselect" : 0,
					"numinlets" : 1,
					"numoutlets" : 6,
					"outlettype" : [ "", "", "", "", "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 439.800000000000011, 91.0, 100.0, 100.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_invisible" : 1,
							"parameter_longname" : "chooser",
							"parameter_shortname" : "chooser",
							"parameter_type" : 3
						}

					}
,
					"varname" : "chooser"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-27",
					"items" : [ "azi:azi", ",", "bbc-vamp-plugins:bbc-energy", ",", "bbc-vamp-plugins:bbc-intensity", ",", "bbc-vamp-plugins:bbc-peaks", ",", "bbc-vamp-plugins:bbc-rhythm", ",", "bbc-vamp-plugins:bbc-spectral-contrast", ",", "bbc-vamp-plugins:bbc-spectral-flux", ",", "bbc-vamp-plugins:bbc-speechmusic-segmenter", ",", "beatroot-vamp:beatroot", ",", "cepstral-pitchtracker:cepstral-pitchtracker", ",", "cqvamp:cqchromavamp", ",", "cqvamp:cqvamp", ",", "cqvamp:cqvampmidi", ",", "match-vamp-plugin:match", ",", "mvamp:marsyas_bextract_centroid", ",", "mvamp:marsyas_bextract_lpcc", ",", "mvamp:marsyas_bextract_lsp", ",", "mvamp:marsyas_bextract_mfcc", ",", "mvamp:marsyas_bextract_rolloff", ",", "mvamp:marsyas_bextract_scf", ",", "mvamp:marsyas_bextract_sfm", ",", "mvamp:marsyas_bextract_zero_crossings", ",", "mvamp:marsyas_ibt", ",", "mvamp:zerocrossing", ",", "nnls-chroma:chordino", ",", "nnls-chroma:nnls-chroma", ",", "nnls-chroma:tuning", ",", "pyin:localcandidatepyin", ",", "pyin:pyin", ",", "pyin:yin", ",", "qm-vamp-plugins:qm-adaptivespectrogram", ",", "qm-vamp-plugins:qm-barbeattracker", ",", "qm-vamp-plugins:qm-chromagram", ",", "qm-vamp-plugins:qm-constantq", ",", "qm-vamp-plugins:qm-dwt", ",", "qm-vamp-plugins:qm-keydetector", ",", "qm-vamp-plugins:qm-mfcc", ",", "qm-vamp-plugins:qm-onsetdetector", ",", "qm-vamp-plugins:qm-segmenter", ",", "qm-vamp-plugins:qm-similarity", ",", "qm-vamp-plugins:qm-tempotracker", ",", "qm-vamp-plugins:qm-tonalchange", ",", "qm-vamp-plugins:qm-transcription", ",", "segmentino:segmentino", ",", "silvet:silvet", ",", "simple-cepstrum:simple-cepstrum", ",", "supervp:supervpf0featurescoring", ",", "supervp:supervpf0pitchedpercussion", ",", "supervp:supervpf0primesmatching", ",", "supervp:supervpformantced", ",", "supervp:supervpformantlpc", ",", "supervp:supervpmask", ",", "supervp:supervppeak", ",", "supervp:supervprdshape", ",", "supervp:supervpspectraldifferencenegative", ",", "supervp:supervpspectraldifferencepositive", ",", "supervp:supervpspectrogramcepstrum", ",", "supervp:supervpspectrogramfft", ",", "supervp:supervpspectrogramlpc", ",", "supervp:supervpspectrogramreaspectrum", ",", "supervp:supervpspectrogramtrueenv", ",", "supervp:supervptransientdetection", ",", "supervp:supervpvoicedunvoiced", ",", "supervp:superwaveform", ",", "tempogram:tempogram", ",", "tipic:tipic", ",", "tuning-difference:tuning-difference", ",", "ua-vamp-plugins:mf0ua", ",", "ua-vamp-plugins:onsetsua", ",", "vamp-aubio:aubiomelenergy", ",", "vamp-aubio:aubiomfcc", ",", "vamp-aubio:aubionotes", ",", "vamp-aubio:aubioonset", ",", "vamp-aubio:aubiopitch", ",", "vamp-aubio:aubiosilence", ",", "vamp-aubio:aubiospecdesc", ",", "vamp-aubio:aubiotempo", ",", "vamp-example-plugins:amplitudefollower", ",", "vamp-example-plugins:fixedtempo", ",", "vamp-example-plugins:percussiononsets", ",", "vamp-example-plugins:powerspectrum", ",", "vamp-example-plugins:spectralcentroid", ",", "vamp-example-plugins:zerocrossing", ",", "vamp-libxtract:amdf", ",", "vamp-libxtract:asdf", ",", "vamp-libxtract:autocorrelation", ",", "vamp-libxtract:average_deviation", ",", "vamp-libxtract:bark_coefficients", ",", "vamp-libxtract:crest", ",", "vamp-libxtract:dct", ",", "vamp-libxtract:f0", ",", "vamp-libxtract:failsafe_f0", ",", "vamp-libxtract:flatness", ",", "vamp-libxtract:harmonic_spectrum", ",", "vamp-libxtract:highest_value", ",", "vamp-libxtract:irregularity_j", ",", "vamp-libxtract:irregularity_k", ",", "vamp-libxtract:kurtosis", ",", "vamp-libxtract:loudness", ",", "vamp-libxtract:lowest_value", ",", "vamp-libxtract:mean", ",", "vamp-libxtract:mfcc", ",", "vamp-libxtract:noisiness", ",", "vamp-libxtract:nonzero_count", ",", "vamp-libxtract:odd_even_ratio", ",", "vamp-libxtract:peak_spectrum", ",", "vamp-libxtract:rms_amplitude", ",", "vamp-libxtract:rolloff", ",", "vamp-libxtract:sharpness", ",", "vamp-libxtract:skewness", ",", "vamp-libxtract:smoothness", ",", "vamp-libxtract:spectral_centroid", ",", "vamp-libxtract:spectral_inharmonicity", ",", "vamp-libxtract:spectral_kurtosis", ",", "vamp-libxtract:spectral_skewness", ",", "vamp-libxtract:spectral_slope", ",", "vamp-libxtract:spectral_standard_deviation", ",", "vamp-libxtract:spectral_variance", ",", "vamp-libxtract:spectrum", ",", "vamp-libxtract:spread", ",", "vamp-libxtract:standard_deviation", ",", "vamp-libxtract:sum", ",", "vamp-libxtract:tonality", ",", "vamp-libxtract:tristimulus_1", ",", "vamp-libxtract:tristimulus_2", ",", "vamp-libxtract:tristimulus_3", ",", "vamp-libxtract:variance", ",", "vamp-libxtract:wavelet_f0", ",", "vamp-libxtract:zcr" ],
					"maxclass" : "chooser",
					"multiselect" : 0,
					"numinlets" : 1,
					"numoutlets" : 6,
					"outlettype" : [ "", "", "", "", "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 26.0, 219.0, 318.0, 335.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-25",
					"maxclass" : "dict.view",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1355.0, 483.0, 224.0, 272.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-24",
					"maxclass" : "dict.view",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1124.0, 483.0, 224.0, 272.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-23",
					"maxclass" : "dict.view",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 888.0, 483.0, 224.0, 272.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-19",
					"maxclass" : "dict.view",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 416.5, 483.0, 224.0, 272.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-5",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 288.0, 115.0, 121.0, 22.0 ],
					"text" : "summary 0 3.478458"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-62",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 286.0, 160.0, 58.0, 22.0 ],
					"text" : "summary"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-46",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1035.0, 86.0, 50.0, 22.0 ],
					"text" : "44100."
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-55",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1020.0, 9.0, 24.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-50",
					"linecount" : 2,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1184.0, 60.0, 50.0, 35.0 ],
					"text" : "3478.45805"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-38",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 9,
					"outlettype" : [ "float", "list", "float", "float", "float", "float", "float", "", "int" ],
					"patching_rect" : [ 1040.0, 52.0, 103.0, 22.0 ],
					"text" : "info~ drumLoop"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-53",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 835.717980146408081, 28.41025722026825, 48.0, 22.0 ],
					"text" : "replace"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-44",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 531.600002467632294, 213.0, 82.0, 22.0 ],
					"text" : "set drumLoop"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-26",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1061.0, 147.0, 33.0, 22.0 ],
					"text" : "read"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-28",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"patching_rect" : [ 1069.0, 175.0, 187.0, 22.0 ],
					"text" : "buffer~ drumLoop1 cello.wav -1 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-22",
					"maxclass" : "newobj",
					"numinlets" : 5,
					"numoutlets" : 5,
					"outlettype" : [ "", "", "", "", "" ],
					"patching_rect" : [ 758.0, 336.0, 191.0, 22.0 ],
					"text" : "route info outputs params features"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-18",
					"maxclass" : "dict.view",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 662.0, 483.0, 224.0, 272.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-14",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 789.0, 63.0, 33.0, 22.0 ],
					"text" : "read"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-13",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 356.0, 288.0, 24.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-12",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"patching_rect" : [ 797.0, 91.0, 201.0, 22.0 ],
					"text" : "buffer~ drumLoop drumLoop.aif -1 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-11",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 26.0, 575.0, 79.0, 22.0 ],
					"text" : "prepend plug"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-7",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 667.0, 401.0, 35.0, 22.0 ],
					"text" : "clear"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 565.0, 356.0, 77.0, 22.0 ],
					"text" : "route plugins"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 561.0, 385.0, 104.0, 22.0 ],
					"text" : "prepend append"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 456.0, 320.0, 128.0, 22.0 ],
					"text" : "vamp.host~ drumLoop"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 389.0, 343.0, 47.0, 22.0 ],
					"text" : "plugins"
				}

			}
, 			{
				"box" : 				{
					"attr" : "step_delta",
					"id" : "obj-3",
					"maxclass" : "attrui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 515.0, 281.0, 273.0, 22.0 ]
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-19", 0 ],
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"order" : 1,
					"source" : [ "obj-1", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-22", 0 ],
					"order" : 0,
					"source" : [ "obj-1", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"midpoints" : [ 35.5, 628.0, 375.5, 628.0, 375.5, 309.0, 465.5, 309.0 ],
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-12", 0 ],
					"source" : [ "obj-14", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-18", 0 ],
					"midpoints" : [ 767.5, 420.0, 671.5, 420.0 ],
					"source" : [ "obj-22", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-23", 0 ],
					"midpoints" : [ 810.5, 420.0, 897.5, 420.0 ],
					"source" : [ "obj-22", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-24", 0 ],
					"midpoints" : [ 853.5, 420.0, 1133.5, 420.0 ],
					"source" : [ "obj-22", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-25", 0 ],
					"midpoints" : [ 896.5, 420.0, 1364.5, 420.0 ],
					"source" : [ "obj-22", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-28", 0 ],
					"source" : [ "obj-26", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"source" : [ "obj-27", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-29", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-3", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-46", 1 ],
					"source" : [ "obj-38", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-50", 1 ],
					"source" : [ "obj-38", 6 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-44", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-5", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-12", 0 ],
					"source" : [ "obj-53", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-38", 0 ],
					"source" : [ "obj-55", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-62", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-27", 0 ],
					"midpoints" : [ 570.5, 417.0, 357.0, 417.0, 357.0, 208.0, 35.5, 208.0 ],
					"source" : [ "obj-8", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-29" : [ "chooser", "chooser", 0 ],
			"parameterbanks" : 			{

			}
,
			"inherited_shortname" : 1
		}
,
		"dependency_cache" : [ 			{
				"name" : "vamp.host~.mxo",
				"type" : "iLaX"
			}
 ],
		"autosave" : 0,
		"styles" : [ 			{
				"name" : "ksliderWhite",
				"default" : 				{
					"color" : [ 1, 1, 1, 1 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "newobjBlue-1",
				"default" : 				{
					"accentcolor" : [ 0.317647, 0.654902, 0.976471, 1 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "newobjGreen-1",
				"default" : 				{
					"accentcolor" : [ 0, 0.533333, 0.168627, 1 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "numberGold-1",
				"default" : 				{
					"accentcolor" : [ 0.764706, 0.592157, 0.101961, 1 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
 ]
	}

}

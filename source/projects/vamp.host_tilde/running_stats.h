// Copyright (C) 2008  Davis E. King (davis@dlib.net), Steve Taylor
// License: Boost Software License   See LICENSE.txt for the full license.
//

#ifndef running_stats_h
#define running_stats_h

#include <assert.h>

template <typename T>
class running_stats
{
public:

    running_stats()
    {
        clear();
    }

    void clear()
    {
        sum = 0;
        sum_sqr  = 0;
        sum_cub  = 0;
        sum_four = 0;

        n = 0;
        min_value = std::numeric_limits<T>::infinity();
        max_value = -std::numeric_limits<T>::infinity();
    }

    void add (
        const T& val
    )
    {
        sum      += val;
        sum_sqr  += val*val;
        sum_cub  += cubed(val);
        sum_four += quaded(val);

        if (val < min_value)
            min_value = val;
        if (val > max_value)
            max_value = val;

        ++n;
    }

    T current_n (
    ) const
    {
        return n;
    }

    T mean (
    ) const
    {
        if (n != 0)
            return sum/n;
        else
            return 0;
    }

    T max (
    ) const
    {
        if(current_n() < 1) throw std::out_of_range("you have to add some numbers to this object first");
        return max_value;
    }

    T min (
    ) const
    {
        // make sure requires clause is not broken
        if(current_n() < 1) throw std::out_of_range("you have to add some numbers to this object first");

        return min_value;
    }

    T variance (
    ) const
    {
        // make sure requires clause is not broken
        if(current_n() < 2) throw std::out_of_range("you have to add more numbers to this object first");

        T temp = 1/(n-1);
        temp = temp*(sum_sqr - sum*sum/n);
        // make sure the variance is never negative.  This might
        // happen due to numerical errors.
        if (temp >= 0)
            return temp;
        else
            return 0;
    }

    T stddev (
    ) const
    {
        // make sure requires clause is not broken
        if(current_n() < 2) throw std::out_of_range("you have to add more numbers to this object first");

        return std::sqrt(variance());
    }

    T skewness (
    ) const
    {
        // make sure requires clause is not broken
        if(current_n() < 3) throw std::out_of_range("you have to add more numbers to this object first");

        T temp  = 1/n;
        T temp1 = std::sqrt(n*(n-1))/(n-2);
        temp    = temp1*temp*(sum_cub - 3*sum_sqr*sum*temp + 2*cubed(sum)*temp*temp)/
                  (std::sqrt(std::pow(temp*(sum_sqr-sum*sum*temp),3)));

        return temp;
    }

    T ex_kurtosis (
    ) const
    {
        // make sure requires clause is not broken
        if(current_n() < 4) throw std::out_of_range("you have to add more numbers to this object first");

        T temp = 1/n;
        T m4   = temp*(sum_four - 4*sum_cub*sum*temp+6*sum_sqr*sum*sum*temp*temp
                 -3*quaded(sum)*cubed(temp));
        T m2   = temp*(sum_sqr-sum*sum*temp);
        temp   = (n-1)*((n+1)*m4/(m2*m2)-3*(n-1))/((n-2)*(n-3));

        return temp;
    }

    T scale (
        const T& val
    ) const
    {
        // make sure requires clause is not broken
        assert(current_n() > 1);
        return (val-mean())/std::sqrt(variance());
    }

    running_stats operator+ (
        const running_stats& rhs
    ) const
    {
        running_stats temp(*this);

        temp.sum += rhs.sum;
        temp.sum_sqr += rhs.sum_sqr;
        temp.sum_cub += rhs.sum_cub;
        temp.sum_four += rhs.sum_four;
        temp.n += rhs.n;
        temp.min_value = std::min(rhs.min_value, min_value);
        temp.max_value = std::max(rhs.max_value, max_value);
        return temp;
    }



private:
    T sum;
    T sum_sqr;
    T sum_cub;
    T sum_four;
    T n;
    T min_value;
    T max_value;

    T cubed  (const T& val) const {return val*val*val; }
    T quaded (const T& val) const {return val*val*val*val; }
};



#endif /* running_stats_h */

#ifndef LIST_H
#define LIST_H
#include "Arduino.h"

class List {
    public:
        List(int capacity);
        void push(float value);
        float getMean();
        int size;
    
    private:
        int _capacity;
        int _currentIdx;
        float *_data;
};

#endif
import React from 'react';

describe('test', ()=>{
    it('test',()=>{
        const mock = jest.fn().mockReturnValue({test: 'mock'});
        const funck = (...p: any) => mock(...p);

        expect(funck()).toEqual({test: 'mock'});
        expect(1).toBe(1)

    });
});
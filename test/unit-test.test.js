const assert = require('chai').assert

function addValue(num1,num2)
{
    return num1 + num2;
}

describe('suite de pruebas para nuestra Api', ()=>{
    it('esperamos un 10', ()=>{
        let data = addValue(5,5)
        assert.equal(data,10)
    })
})

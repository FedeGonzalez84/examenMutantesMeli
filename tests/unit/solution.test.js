const solution = require('../../solution');

// Test sobre isMutant(dna)

describe('Test over isMutant(dna)', () => {
    
    it('Should be return true, if have more than one repeat secuence ', () => {
        const dna = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
        const result = solution.isMutant(dna);
        expect(result).toBeTruthy();
    });
    
    it('Should be return false, if dont have more than one repeat secuence ', () => {
        const dna = ["ATGC","CAGT","TTAT","AGAA"];
        const result = solution.isMutant(dna);
        expect(result).toBeFalsy();
    });
});

import{ countDays } from './client/js/formHandler'
test('Testing the countDays Function', ()=>{
    const date1 = new Date('2020-01-01')
    const date2 = new Date('2020-01-05')
    const testLength = countDays(date1, date2) 
    expect(testLength).toBe(4);
})
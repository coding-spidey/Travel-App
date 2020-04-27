import { handleSubmit } from './client/index'
test('testing if Index.js is exporting', ()=>{
    expect(handleSubmit).not.toBeNull();
})
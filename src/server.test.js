import { credentials } from './server/index'
import "babel-polyfill"
test('testing the server credentials', ()=>{
    expect(credentials).not.toBeNull();
})
import { Validozer } from 'formydable'

Validozer.rulesExtend({
    strong_password: {
        exe({ received }) {
            const test = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/g.test(received);
            return received.length && !test;
        },
        message: "The :attribute must have 1 capital letter, 1 number, and 1 special character." 
    }
})
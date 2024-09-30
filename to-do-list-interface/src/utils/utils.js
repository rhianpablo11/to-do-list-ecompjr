
import Cookies from 'js-cookie'

export function save_cookie_token(token_to_save){
    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + 5);
    Cookies.set("token", token_to_save, {expires: 1})
    return null
}

export function get_token(){
    return Cookies.get('token')
}

export function remove_token(){
    Cookies.remove('token')
}



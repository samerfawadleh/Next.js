import Cookies from 'universal-cookie';

export const getUserId = (req) => {
    const cookies = new Cookies();
    let userId = null;

    if(req) {
        if(req.headers.cookie) {
            for(let value of req.headers.cookie.split(";") ){
                const keyPair = value.split("=");
                if('userId' === keyPair[0].trim()){
                    userId = keyPair[1];
                    break;
                }
            }
        }
    } else {
        userId = cookies.get('userId');
    }

    return userId;
}
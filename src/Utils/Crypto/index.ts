// import jsEncrypt from "jsencrypt"
import crypto, { RsaPrivateKey } from "crypto"

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0qLBf3OkjYLfRmA+CRLf
8rAwGfBgSAsvsG+DHa0Vnj7Bo9kxLkF/SUPD6KL+dFHVWeMlB3JX5OPqtyTclGzu
11MSy7m/Q6M/jPdFLOFJhX9jhYW1JSbCbxOzfDCB0BqPHKjPzDm6qruK989b5Lvc
fnMJNamtSuzoH/wYlrmutsxffalY2yW9ZwyBxqx7lFg1NNJhUBBuePuX6g5NzaDm
cK4kR+kCTGKNd+vYr7o6cMbizAj/UfPNkPNyZik8bw/WIhybMevRcOqK28INHnQZ
u/WSvNlhoZz0qfcheYJIWMoZZwhV5jxvzDv7SYFWM5wPwdY/S3Ffv/K4id5KVM0j
EwIDAQAB
-----END PUBLIC KEY-----
`

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEA0qLBf3OkjYLfRmA+CRLf8rAwGfBgSAsvsG+DHa0Vnj7Bo9kx
LkF/SUPD6KL+dFHVWeMlB3JX5OPqtyTclGzu11MSy7m/Q6M/jPdFLOFJhX9jhYW1
JSbCbxOzfDCB0BqPHKjPzDm6qruK989b5LvcfnMJNamtSuzoH/wYlrmutsxffalY
2yW9ZwyBxqx7lFg1NNJhUBBuePuX6g5NzaDmcK4kR+kCTGKNd+vYr7o6cMbizAj/
UfPNkPNyZik8bw/WIhybMevRcOqK28INHnQZu/WSvNlhoZz0qfcheYJIWMoZZwhV
5jxvzDv7SYFWM5wPwdY/S3Ffv/K4id5KVM0jEwIDAQABAoIBAQDGRlS036vHValN
Ou1KZ00NyxIMaLyJNJZ4lA+tUK+n3VU0Ig/shdUGp1Zz13KFFj8qNOo3X0gjevQH
4BgPU5dkc5ue0EOdrL72uBCS1aL6mlaZaqqAxUKDgt0Siyq3NTj/9lxc1v7DFnUT
HktXPgupsCm8LPOmMumyqgCPaUxwXq34xiLmcucKNfq7mMIVqdgXyQxbWf8Fehga
PxjsnXPKzw5xV+UUA9+nTkpAJ/0B3eZzZ2GZgjeRFSTvkb4eo/5buPpoPgDOsQoU
C5e9BKXQuJC3To/mJbtCRhCKrETz7rewjsKVl/crT6KPoS/EHRU7wUgVaP97vJFr
oZfU7OchAoGBAPIpjSwGjav8iTH80GSoApOH2Tt/HlWxMP7PiST/o75lHbosJFfe
YLBbueLLSF7YeSbGhqYZmsTtfRBdu9fv46Fc4jP9TBg+qR166DCFdizMCPUkBQBv
j6Vra2EYMnS1r+pbx0O+mE/YnFLsnq919XCny2Jrq/oQdlZ47GPaQHWxAoGBAN6s
BXPgEZxylpQ7Q+VdlJq+OAcaPZlraxTpvUvHlZYPsZckxp5We5WhbRVVOHVRSjwk
hltsj2x5qd9dH9LAyZiza5oDhMZkx2sXa0bht9qqG6A7ivqKhXI8FGK/P+sS6M3B
xfkknzqodwDiKJsGYi7XFrxcxLeTuVzKhBOCXmIDAoGBAI+srXB4dueajj+VMoL1
14l2aSFOm03WMi6MLV9BOQJGdeu2Mt3bN1yLH296knaLUt35nXvA5z19dd0W79L/
Jfvf4ulbmCEuVCIEgOwA0wtjBtGCzGDkz8IiSHQz6gOqpDOUvlXoJ+//oUfl0YRi
pPtw4k+DeGaGC9/kIMRhgisRAoGAe3leKKwmd99eumHGu4hR4CD8xot5fvp+zYDz
c/L/cs/PBWXiMWj5bLav23V/MibaiFEko8umGFu6o95qyB4Za/CKCURMOwslPbAl
z49YuQs8+HQsE9P+PaMtFrjAg+TfbUE3O3lgRlGmc7n1FEnM5fZlaBv1BWsIDXlL
Fdpj5esCgYEAnaeHr6+bOt68bFaFzbRE5X2OIChasKT00qqRiw4pNyWPV1kAOwnp
xRefuHyBAGQo4d+RZE3gFs7WWSM2XN9jo5CVXo3giaTQQ7A+7G8Fn7aikx2ZHeHG
TQU2fQ7duknPQr061hA9B7FVLPDn2iX+TjKFqwuw7wVkroTnwQmZ5Sw=
-----END RSA PRIVATE KEY-----`



export function encrypted(text : string)
{

    const ciphertext = crypto.publicEncrypt(publicKey, Buffer.from(text));
    return ciphertext.toString();
}

export function decrypted(text :string)
{
    let bufferText = Buffer.from(text, 'base64')
    const decrypted = crypto.privateDecrypt({
        key : crypto.createPrivateKey(privateKey),
        padding : crypto.constants.RSA_PKCS1_PADDING
    }, bufferText);
    return decrypted.toString();
}

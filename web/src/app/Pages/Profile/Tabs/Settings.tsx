import React, { useState } from 'react'
import { FormEventType, FormProvider } from 'formydable'
import Text from '@components/Text'
import { Variant } from '@components/types'
import Input from '@components/FormValidated/Input'
import Button from '@components/Button'
import { SessionActionType, useSession } from '@components/Session'
import { useAuthRequest } from '@utils/hooks/useAuthRequest'
import Template from './Template'
import Alert from '@components/Alert'

const Settings: React.FunctionComponent = () => {
    const [, dispatch] = useSession()
    const [message, setMessage] = useState<string>("")
    const requestChangePass = useAuthRequest('/change_password', {
        method: "PUT"
    })
    const requestDelteAccount = useAuthRequest('/user/delete', {
        method: "POST"
    })
    
    const handleChangePassword = (event: FormEventType) => {
        if(event.isReady()) {
            requestChangePass.call({
                data: event.json()
            }).then((response) => {
                if(!(response instanceof Error)) {
                    event.reset()
                    setMessage("Successfully change your password")
                }
            })
        } else {
            event.locateFailed()
        }
    }

    const handleDeleteAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
        const value = prompt("please type `YES` to proceed because this will be a permanent action")
        if(value === "YES") {
            requestDelteAccount.call()
            .then(() => dispatch({
                type: SessionActionType.SET_TOKEN,
                payload: ""
            }))
            .then(() => alert("account is permanently deleted. you will be redirect shortly."))
            
        } else {
            alert("action canceled")
        }
    }

    return (
        <Template icon="star-full" title="Settings">
            <fieldset>
                <Text as="legend" variant={Variant.Success}>Change Password</Text>
                <Alert in={!!message} dismisible onHide={() => setMessage("")} variant={Variant.Success}>
                    {message}
                </Alert>
                <Alert in={!!requestChangePass.error} variant={Variant.Danger}>
                    {requestChangePass.error}
                </Alert>
                <FormProvider onSubmit={handleChangePassword}>
                    <Input name="password" label="Password" rules="required|strong_password|min:8" type="password"/>
                    <Input name="confirm" label="Confirm Password" rules="required|same:password@Password" type="password"/>
                    <Button block variant={Variant.Success} type="submit" loading={requestChangePass.loading}>SUBMIT</Button>
                </FormProvider>
            </fieldset>
            <fieldset>
                <Text as="legend" variant={Variant.Danger}>Delete Account</Text>
                <Button block variant={Variant.Danger} type="submit" loading={requestDelteAccount.loading} onClick={handleDeleteAccount}>PERMANENTLY DELETE ACCOUNT</Button>
            </fieldset>
        </Template>
    )
}

export default Settings

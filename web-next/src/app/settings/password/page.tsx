'use client';

import { usePopupContext } from "@/app/components/popup/popupcontext";
import { requestChangePassword } from "@/app/lib/api";

export default function PasswordSettings() {
    const popupState = usePopupContext();

	function updatePassword() {
		popupState.setEnabled(true);
		popupState.setTitle('Change password');
		popupState.setType('changePassword');
		popupState.setStateCallback(() => { });

		requestChangePassword();
	}
    
    return (
        <>
            <h1>Password Settings</h1>
            <p>You'll have to confirm that it's you when you change your password.</p>

            <button onClick={updatePassword}>Change Password</button>
        </>
    )
}
<?php

namespace Laragear\WebAuthn\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Laragear\WebAuthn\Models\WebAuthnCredential;

class CredentialEnabled
{
    use Dispatchable;

    /**
     * Create a new event instance.
     *
     * @param  \Laragear\WebAuthn\Models\WebAuthnCredential  $credential
     */
    public function __construct(public WebAuthnCredential $credential)
    {
        //
    }
}

<?php

namespace Laragear\WebAuthn;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Date;
use JetBrains\PhpStorm\ArrayShape;
use Laragear\WebAuthn\Models\WebAuthnCredential;

/**
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laragear\WebAuthn\Models\WebAuthnCredential> $webAuthnCredentials
 *
 * @see \Laragear\WebAuthn\Contracts\WebAuthnAuthenticatable
 * @see \Laragear\WebAuthn\Models\WebAuthnCredential
 */
trait WebAuthnAuthentication
{
    /**
     * Returns displayable data to be used to create WebAuthn Credentials.
     *
     * @return array{name: string, displayName: string}
     */
    #[ArrayShape(['name' => "string", 'displayName' => "string"])]
    public function webAuthnData(): array
    {
        return [
            'name' => $this->email,
            'displayName' => $this->name,
        ];
    }

    /**
     * Removes all credentials previously registered.
     *
     * @param  string  ...$except
     * @return void
     */
    public function flushCredentials(string ...$except): void
    {
        if (! $this->relationLoaded('webAuthnCredentials')) {
            $this->webAuthnCredentials()->whereKeyNot($except)->delete();

            return;
        }

        if ($this->webAuthnCredentials instanceof Collection && $this->webAuthnCredentials->isNotEmpty()) {
            $this->webAuthnCredentials->whereNotIn('id', $except)->each->delete();

            $this->setRelation('webAuthnCredentials', $this->webAuthnCredentials->whereIn('id', $except));
        }
    }

    /**
     * Disables all credentials for the user.
     *
     * @param  string  ...$except
     * @return void
     */
    public function disableAllCredentials(string ...$except): void
    {
        if ($this->relationLoaded('webAuthnCredentials') && $this->webAuthnCredentials instanceof Collection) {
            $this->webAuthnCredentials
                ->when($except)->whereNotIn('id', $except)
                ->each(static function (WebAuthnCredential $credential): void {
                    if ($credential->isEnabled()) {
                        $credential->disable();
                    }
                });
        } else {
            $this->webAuthnCredentials()->whereKeyNot($except)->whereEnabled()->update(['disabled_at' => Date::now()]);
        }
    }

    /**
     * Makes an instance of a WebAuthn Credential attached to this user.
     *
     * @param  array  $properties
     * @return \Laragear\WebAuthn\Models\WebAuthnCredential
     */
    public function makeWebAuthnCredential(array $properties): Models\WebAuthnCredential
    {
        return $this->webAuthnCredentials()->make()->forceFill($properties);
    }

    /**
     * Returns a queryable relationship for its WebAuthn Credentials.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany&\Laragear\WebAuthn\Models\WebAuthnCredential
     */
    public function webAuthnCredentials(): MorphMany
    {
        return $this->morphMany(Models\WebAuthnCredential::class, 'authenticatable');
    }
}

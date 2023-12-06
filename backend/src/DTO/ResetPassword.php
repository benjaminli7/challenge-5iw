<?php 
namespace App\DTO;
use ApiPlatform\Metadata\ApiResource;

#[ApiResource]
class ResetPassword {
    protected string $email ;
    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }
    
    /* creer getter et setter
    creer une api Ressource
    creer une opération POST
    creer un state processor ou custom controller*/

}
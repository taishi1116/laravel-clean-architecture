<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PreRegisterUserMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */

    //引数で受け取ったメアドとリンク
    protected $register_url;

    public function __construct($register_url)
    {
        $this->register_url = $register_url;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('shinoda@hoge.com')
            ->subject('本登録リンクのお知らせ')
            ->view('mail.pre_register')
            ->with(['resister_url' => $this->register_url]);
    }
}

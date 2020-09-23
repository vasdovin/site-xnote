<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {


    $fromAdminHeaders = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset="UTF-8";',
        'Content-Transfer-Encoding: 7bit',
        'Date: ' . date('r', $_SERVER['REQUEST_TIME']),
        'From: ' . $_POST["email"],
        'Reply-To: ' .  $_POST["email"],
        'Return-Path: ' . $_POST["email"],
    ];

    $fromUserHeaders = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset="UTF-8";',
        'Content-Transfer-Encoding: 7bit',
        'Date: ' . date('r', $_SERVER['REQUEST_TIME']),
        'From: ' . $_POST["email-to"],
        'Reply-To: ' .  $_POST["email-to"],
        'Return-Path: ' . $_POST["email-to"],
    ];

    mail($_POST["email-to"], $_POST["subject"], $_POST["textarea"], implode("\n", $fromAdminHeaders));

    mail($_POST["email"], $_POST["subject"], $_POST["answering"], implode("\n", $fromUserHeaders));

}
#!/usr/bin/php

<?php 

     // /*************************************/
     // /********Socket Server*********************/
     // set_time_limit (0);
     // // Set the ip and port we will listen on
     // $address = '127.0.0.1';
     // $port = 6789;
     // // Create a TCP Stream socket
     // $sock = socket_create(AF_INET, SOCK_STREAM, 0); // 0 for  SQL_TCP
     // // Bind the socket to an address/port
     // socket_bind($sock, 0, $port) or die('Could not bind to address');  //0 for localhost
     // // Start listening for connections
     // socket_listen($sock);
     // //loop and listen
     // while (true) {
     // /* Accept incoming  requests and handle them as child processes */
     // $client =  socket_accept($sock);
     // // Read the input  from the client – 1024000 bytes
     // $input =  socket_read($client, 1024000);
     // // Strip all white  spaces from input
     // $output =  ereg_replace("[ \t\n\r]","",$input)."\0";
     // $message=explode('=',$output);
     // if(count($message)==2)
     // {
     // if(get_new_order()) $response='NEW:1';
     // else  $response='NEW:0';
     // }
     // else $response='NEW:0';
     // // Display output  back to client
     // socket_write($client, $response);
     // socket_close($client);
     // }
     // // Close the master sockets
     // socket_close($sock);
/**
 * 
 * This Script was modified by Emakpor Jeffrey 
 * credit to @author www.geekonthehill.com
 */

// Set the time zone you wish to use date_default_timezone_set('America/New_York');
// Set some variables
$timeNow = time();
$fresh = time() - 900; // to check for reports on the same IP within the past 15 minutes
$currentDateTime = (date("M d, Y h:i:s a"));
$domain = "server.hostname"; // For database "domain" entry. Not otherwise important.

// Get arguments from CSF
$args = $argv; 
     // Use arguments to set PHP variables
     $ip = $args[1];
     $ports = $args[2];
     $direction = $args[4];
     $csf_message = $args[6];
     $csf_log = $args[7];
     $csf_trigger = $args[8];
var_dump($args);
// exclude your own server from reports due to dumb user errors
if ($ip == "xxx.xxx.xxx.xxx" || $ip == "xxx.xxx.xxx.xxx" || $ip == "xxx.xxx.xxx.xxx") { die; }

if ($csf_trigger == "LF_SSHD") {
     $categories = "18,22";
     $comment = "Multiple failed SSH logins";
}
if ($csf_trigger == "LF_DISTATTACK") {
     $categories = "18,22";
     $comment = "Distributed SSH attack";
}
if ($csf_trigger == "LF_DISTFTP") {
     $categories = "5,18";
     $comment = "Distributed FTP attack";
}
if ($csf_trigger == "LF_FTPD") {
     $categories = "5,18";
     $comment = "Multiple failed FTP logins";
}
if ($csf_trigger == "LF_DISTSMTP") {
     $categories = "18";
     $comment = "Distributed SMTP attack";
}
if ($csf_trigger == "LF_CPANEL") {
     $categories = "21";
     $comment = "Multiple failed cPanel logins";
}
// If NOTA are true, then exit script
if (!isset($categories)) { die; }

if (empty($reportDate)) {



     $server = stream_socket_server("tcp://127.0.0.1:8080", $errno, $errorMessage);
     socket_send($server, 'helo');
   /**
    * we will be sending data to our nodejs slack app 
    * @var headers will be custom header
    * @var curl_init url will be our nodejs server link for receiving our data
    */

    // Using the array urlencodes the data
    $data = (array(
        "ip"  => $ip,
        "categories" => $categories,
        "comment" => $comment
    ));
    $headers =  array('Key: your-abuseipdb-api-key-goes-here', 'Accept: application/json');
    $ch = curl_init("https://api.abuseipdb.com/api/v2/report");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 ); // Set to 0 for testing to display response from AbuseIPDB
        curl_setopt($ch, CURLOPT_POST,           1 );
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $output=curl_exec($ch);
    curl_close($ch);
}
die;
?>

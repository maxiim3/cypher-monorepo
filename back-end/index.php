<?php

$ROUTES = array("home" => "/", "cypher" => "/cypher");


header('Access-Control-Allow-Origin: http://localhost:3000');
switch ($_SERVER['REQUEST_URI']) {
    case $ROUTES['home']:
        if ($_SERVER['REQUEST_METHOD'] == "GET") {
            header('Content-Type: application/json');

            echo json_encode(['data' => 'Hello World From PHP']);
        }
        break;
    case $ROUTES['cypher']:
        if ($_SERVER['REQUEST_METHOD'] == "GET") {
            header('Content-Type: application/json');

            echo json_encode(['data' => 'cypherizing..']);
        } elseif ($_SERVER['REQUEST_METHOD'] == "POST") {
            header('Content-Type: application/json');

            $rawData = file_get_contents('php://input');
            $clientData = json_decode($rawData);
            error_log(print_r($clientData, true));
            $message = $clientData -> message;
            $secret = $clientData -> secret;

            echo json_encode(['response' => $message, 'type' => 'PHP']);
        }
        break;
    default:
        header('Content-Type: text/plain', true, 404);

        echo 'Not Found';
        break;
}

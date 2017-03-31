<?php

require '../vendor/autoload.php';

// // Create app
// $app = new \Slim\App();

// // Get container
// $container = $app->getContainer();

// // Register component on container
// $container['view'] = function ($container) {
//     $view = new \Slim\Views\Twig('views/templates', [
//         'cache' => false
//     ]);
    
//     // Instantiate and add Slim specific extension
//     $basePath = rtrim(str_ireplace('index.php', '', $container['request']->getUri()->getBasePath()), '/');
//     $view->addExtension(new Slim\Views\TwigExtension($container['router'], $basePath));

//     return $view;
// };

// // Render Twig template in route
// $app->get('/', function ($request, $response, $args) {
//     return $this->view->render($response, 'views/pages/index.html');
// })->setName('index');

// // Run app
// $app->run();



$app = new \Slim\App;

$app->get('/', function($request, $response) {
	return 'hello world';
});

$app->run();
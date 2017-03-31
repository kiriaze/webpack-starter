<?php

// https://akrabat.com/wp-content/uploads/2015-05-20-phpberks-getting-started-with-slim-3.pdf

require '../vendor/autoload.php';

$config = [
	'settings' => [
		'displayErrorDetails' => true
	]
];

$app = new \Slim\App($config);

$container = $app->getContainer();

$container['view'] = function ($container) {
	
	$templates  = __DIR__ . '/views/';

	$args 		= [
		'debug' => true, // This line should enable debug mode
		'cache' => false
	];

	$view = new Slim\Views\Twig($templates, $args);

	return $view;

};

// get json data
function getData() {

	$data = [];
	$files = scandir(__DIR__ . '/assets/data');

	foreach( $files as $file ) {

		if ( $file != '.' && $file != '..' ) {
			
			$json = file_get_contents( __DIR__ . '/assets/data/' . $file );
			
			$name = substr($file, 0, -5);

			$data['data'][$name] = json_decode($json, true);

		}
	}

	return $data;
}

// index
$app->get('/', function($request, $response) {

	$data = getData();

	return $this->view->render($response, 'pages/index.html', $data);

});

// dynamic routing
$app->get('/{name}', function($request, $response, $args) {
	$name = $args['name'];
	$name = htmlspecialchars($name);
	$data = getData();
	return $this->view->render($response, 'pages/'. $name .'.html', $data);
});

$app->run();

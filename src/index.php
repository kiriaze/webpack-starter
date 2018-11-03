<?php

require '../vendor/autoload.php';

$config = [
	'settings' => [
		'displayErrorDetails' => true
	]
];

$app = new \Slim\App($config);

$container = $app->getContainer();

$container['view'] = function ($container) {
	
	$templates  = [
		// __DIR__ . '/views/',
		__DIR__ . '/' // root relative for everything, since issues keeping in sync between twig.js and twig.php for includes of files not located in views dir; e.g. asssets/vectors
	];

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

	$date = new DateTime();

	$data['data'] = [
		'timestamp' => $date->getTimestamp(),
		'env'       => 'local',
		// explode http_host to accomodate both localhost and proxy ip
		'portPath'  => 'http://'. explode(':', $_SERVER['HTTP_HOST'])[0] .':3000/assets'
	];
	
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

	return $this->view->render($response, 'views/pages/index.html', $data);

});

// dynamic routing
$app->get('/{name}', function($request, $response, $args) {
	$name = $args['name'];
	$name = htmlspecialchars($name);
	$data = getData();
	return $this->view->render($response, 'views/pages/'. $name .'/index.html', $data);
});

$app->run();
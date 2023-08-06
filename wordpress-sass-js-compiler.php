<?php

/*
 * Plugin Name: Wordpress Sass Js Compiler
 * Plugin URI: http://www.example.com
 * Plugin Prefix: sass_js_compiler
 * Plugin ID: sass_js_compiler
 * Description: Wordpress Sass Js Compiler
 * Version: 1.0.0
 * Author: Zied Maaloul
 * Author URI: http://www.example.com
 * Domain Path: languages
 * Domain Var: PLUGIN_TD
 * License: GPL-2.0-or-later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */


 add_action('wp_enqueue_scripts', function (){
     wp_enqueue_style('style-builded-css', plugin_dir_url(__FILE__).'advanced_assets/style.min.css');
     wp_enqueue_script('jquery');
     
     // Now, you can add your custom JavaScript file that depends on jQuery
     wp_enqueue_script('your-jquery-script', plugin_dir_url(__FILE__) . 'advanced_assets/script.min.js', array('jquery'), '1.0', true);
 });
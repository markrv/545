<?php
// No direct access to this file
defined('_JEXEC') or die;
 
JLoader::register('modToursCalendar', JPATH_BASE.'/modules/mod_tourscalendar/helper.php');

$events = JRequest::getVar('getEvents','');
$month = JRequest::getVar('month' . $events, '');

require JModuleHelper::getLayoutPath('mod_tourscalendar', $params->get('layout', 'default'));

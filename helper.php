<?php
// No direct access to this file
defined('_JEXEC') or die;

class modToursCalendar
{
	public static function getToursDate() {
        $title_date="9990b36c-1145-456e-bf15-a3dcabe71429";
		$db = JFactory::getDBO();
		$db->setQuery($db->getQuery(true)
			->select("elements")
			->from("#__zoo_item")
            ->where("application_id = 4")
		);
        $qwe = $db->loadAssocList();
        $i0 = 0;
        foreach( $qwe as $i => $q){
            $arrelements =  json_decode($q['elements'], true);
            $idate=$arrelements[$title_date];
            foreach($idate as $idat) {
                $rez[$i0] = substr($idat['value'], 0, 10);
                $i0++;
            }
        }
		return json_encode ($rez);
	}
    public static function getToursTextAjax() {}
    public static function getCLang() {
        $langs = JFactory::getLanguage();
        $lang = $langs->getTag();
        $rlang = ($lang=="ru-RU")? "ru" : "ua";
        return $rlang;
    }
    public static function getToursText() {
        $lang = modToursCalendar::getCLang();
        $db = JFactory::getDBO();
        $db->setQuery($db->getQuery(true)
            ->select("alias, elements")
            ->from("#__zoo_item")
            ->where("application_id = 4")
        );
        $qwe = $db->loadAssocList();
        $i0 = 0;
        foreach( $qwe as $i => $q){
            $arrelements =  json_decode($q['elements'], true);
            $idate=$arrelements['9990b36c-1145-456e-bf15-a3dcabe71429'];
            $ititle = $arrelements['a03e71e3-dd28-43b3-a0b1-91f21d0b6fef'];
            $ititleru = $arrelements['4c0dd672-3ef0-4e14-b8f4-506352c67473'];
            $itext = $arrelements['3b99a9cf-ba7d-4e9c-9b4a-8adb2fa1777c'];
            $itextru = $arrelements['81d6debb-66c9-49f1-b071-d68d28779ff3'];
            foreach($idate as $idat) {
                $rez[$i0]['date'] = substr($idat['value'], 0, 10);
                $rez[$i0]['title'] = ($lang=="ru")? $ititleru[0]['value'] : $ititle[0]['value'];
                $rez[$i0]['text'] = ($lang=="ru")? $itextru[0]['value'] :$itext[0]['value'];
                $rez[$i0]['alias']= $q['alias'];
                $i0++;
            }
        }
        return $rez;
    }
}
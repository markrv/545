<?php
// No direct access to this file
defined('_JEXEC') or die;
?>
<?php
//$doc = JFactory::getDocument();
//$doc->addScript(JURI::base().'media/jui/js/jquery.js');
//$doc->addScript(JURI::base().'media/jui/js/jquery.ui.core.js');
//$doc->addScript(JURI::base().'modules/mod_tourscalendar/js/plugin.js');
//$doc->addScript(JURI::base().'modules/mod_tourscalendar/js/main.js');
?>
<div class="uk-grid">
    <div class="uk-width-medium-2-3 slidrow">
        <div class="slidnav ">
            <a href="#slider1" class="arrow next"></a>
            <a href="#slider1" class="arrow prev"></a>
            <div class="slidewrap">
                <ol class="slider" id="slider1">
                    <?php foreach(modToursCalendar::getToursText() as $item):?>
                        <li itemdate="<?= $item['date'] ?>" hidden>
                            <h4><?= $item['title'] ?></h4>
                            <p><?= $item['text'] ?></p>
                            <a class="more" href="<?= JURI::base(). 'tours/new-tour/item/' . $item['alias'] ?>"><?php echo JText::_('MOD_TOURISCALENDAR_TEXT1'); ?></a>
                        </li>
                    <?php endforeach ?>
            </ol>
            </div>
        </div>
    </div>
    <div class="uk-width-medium-1-3">
        <div id="datepicker"></div>
    </div>
</div>
<script>
    var availableDates = <?php echo modToursCalendar::getToursDate(); ?>;
    var clang = "<?php echo modToursCalendar::getCLang(); ?>";
</script>
<script src="<?= JURI::base()?>modules/mod_tourscalendar/js/plugin.js" type="text/javascript"></script>
<script src="<?= JURI::base()?>modules/mod_tourscalendar/js/main.js" type="text/javascript"></script>
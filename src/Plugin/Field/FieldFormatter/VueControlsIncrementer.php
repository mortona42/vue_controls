<?php

namespace Drupal\vue_controls\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;

/**
 * Plugin implementation of the 'vue_controls_incrementer' formatter.
 *
 * @FieldFormatter(
 *   id = "vue_controls_incrementer",
 *   label = @Translation("Vue controls incrementer"),
 *   field_types = {
 *     "integer"
 *   }
 * )
 */
class VueControlsIncrementer extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = [];
    $elements['#theme'] = 'vue_controls_incrementer';
    $elements['#score'] = $items[0]->value;
    $elements['#nid'] = $items->getParent()->get('nid')->value;

    return $elements;
  }

}

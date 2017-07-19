<?php

namespace Drupal\vue_controls\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\Plugin\Field\FieldFormatter\IntegerFormatter;
use Drupal\Core\Render\Element;

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
class VueControlsIncrementer extends IntegerFormatter {
  /**
   * {@inheritdoc}
   */
  public function view(FieldItemListInterface $items, $langcode = NULL) {
    $entity_id = $items->getEntity()->id();
    $bundle = $items->getEntity()->bundle();
    $field_name = $items->getName();
    $field_value = $items->getValue()[0]['value'];
    $field_label = $items->getFieldDefinition()->label();

    $elements = [
      '#theme' => 'vue_controls_incrementer',
      '#entity_id' => $entity_id,
      '#bundle' => $bundle,
      '#field_name' => $field_name,
      '#field_value' => $field_value,
      '#field_label' => $field_label,
    ];
    return $elements;
  }
}

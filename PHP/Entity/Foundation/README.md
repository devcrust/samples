# Foundation

## EntityInterface

The entity interface ensures that other components can deal with common entities if necessary (e.g. from elements in the presentation layer).

## Hydrator

In order to exchange data between the Services and Presentation layer, hydration is used to ensure data (entities) from one layer (source) can be serialised into a JSON format. The same data (JSON) is used on the other layer (target) to unserialise, so both layers can deal with similar entity instance.

The hydrator is based on the [Zend Stdlib](http://framework.zend.com/manual/2.3/en/modules/zend.stdlib.hydrator.html) implementation with additions for entity and [DateTime](http://www.php.net/manual/en/class.datetime.php) handling.

## Supersedable

### Trait

The supersedable trait provides all the necessary functionality (properties/methods) required by the supersedable interface (see below).

### Interface

The supersedable interface is used to ensure each entity that implements this interface must provide all necessary methods to work with the supersedable strategy (don't overwrite data).
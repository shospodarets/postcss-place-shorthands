// REQUIRES
const postcss = require('postcss');

// CONFIG
const shorthandPrefix = 'place';
const shorthandPropSuffixes = ['content', 'self', 'items'];
const alignmentPropPrefixes = ['align', 'justify'];

// THE CONFIG OF PROPERTIES TO PROCESS
// e.g. propsConfig[`place-content`] = [`align-content`, `justify-content`];
const propsConfig = (() => {
    const _propsConfig = {};
    for (const prefix of alignmentPropPrefixes) {
        for (const suffix of shorthandPropSuffixes) {
            const shorthandProp = `${shorthandPrefix}-${suffix}`;
            const propToAdd = `${prefix}-${suffix}`;

            if (!_propsConfig[shorthandProp]) {
                _propsConfig[shorthandProp] = [];
            }

            _propsConfig[shorthandProp].push(propToAdd);
        }
    }
    return _propsConfig;
})();


// HELPERS
/**
 * Returns the declaration values
 * @returns {Array}
 */
function getValues(declValue) {
    const values = postcss.list.space(declValue);

    // remove the !important from the values
    const importantIndex = values.indexOf('!important');
    if (importantIndex !== -1) {
        values.splice(importantIndex, 1);
    }

    return values;
}

/**
 * Checks the declaration is valid
 * @returns {Boolean}
 */
function isDeclarationValid(declValues) {
    // 1 or 2 values are expected
    return declValues.length === 1 || declValues.length === 2;
}

/**
 * Populates the alignment values
 * Tackles the case, when only the common value is provided- in that case, bot values should be the same
 * @returns {Array}
 */
function getAlignmentValues(declValues) {
    const firstAlignmentValue = declValues[0];
    if (declValues.length === 1) { // if the common value is provided
        return [firstAlignmentValue, firstAlignmentValue];
    }

    return declValues;
}

/**
 * Returns the alignment declarations
 * @returns {String}
 */
function getAlignmentDeclarations(declProp, declValues, hasImportant) {
    const alignmentValues = getAlignmentValues(declValues);
    let alignmentDeclarations = '';

    // populate the alignment declarations
    propsConfig[declProp].forEach((alignmentPropertyName, i) => {
        const alignmentDeclaration = `${alignmentPropertyName}: ${alignmentValues[i]}`; // declaration itself
        const importantPart = hasImportant ? ' !important' : '';// tackle if the declaration has !important
        alignmentDeclarations += `${alignmentDeclaration}${importantPart};`; // concatenate
    });

    return alignmentDeclarations;
}

// EXPORTS
module.exports = postcss.plugin('postcss-place', () => {
    return function (css) {
        // Runs through all of the nodes (declarations) in the file
        css.walkDecls((declaration) => {
            const declProp = declaration.prop;

            // check if the property is a shorthand from the config
            if (!(declProp in propsConfig)) {
                return;
            }

            const declValues = getValues(declaration.value);

            // check the declaration is valid
            if (!isDeclarationValid(declValues)) {
                return;
            }

            // prepare the alignment declarations
            const alignmentDeclarations = getAlignmentDeclarations(declProp, declValues, declaration.important);

            // prepend the alignment declarations to the original declaration
            const clone = declaration.cloneBefore();
            clone.replaceWith(alignmentDeclarations);
        });

    };
});

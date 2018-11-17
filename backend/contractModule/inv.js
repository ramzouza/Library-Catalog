

function invariant(){
    /*
        invariant is a function that accepts unlimitted arguments.
        The arguments must be objects of type {"title": str, "expression": bool }
        pre loops over the arguments and evaluates the expressions. 
        If any one is false (explicitly false) then an error is thrown.
    */
    const type = "Invariant";
    const numberOfPostConditions = arguments.length;

    for (i=0; i < numberOfPostConditions; i++){
        assertion = arguments[i];

        // Make sure the pre-condition has a title.
        try{
            assertion.title;
        } catch (e){
            throw `${type} Error. ${type} does not contain a title.`;
        }

        // Make sure the pre-condition has an expression.
        if (assertion.expression == undefined){
            throw `${type} Error. ${type} : "${assertion.title}" does not contain an expression.`;
        } 
        // Make sure the type of the expression is a boolean
        else if (typeof assertion.expression !== "boolean"){
            throw `${type} Error. ${type}: "${assertion.title}" does not contain a boolean expression. Expression must be explicitly boolean.`; 
        }

        // if optional parameter negated is set to true then expression is inverted
        if (assertion.negated === true) assertion.expression = !assertion.expression;

        // if the assertion doesn't hold, throw an error else log the success.
        if (!assertion.expression){
            throw `${type} Error. ${type}: "${assertion.title}" is not satisfied. Expression evaluated to false.`;
        } else {
            console.log(`${type} : "${assertion.title}" has passed. ${assertion.expression}`)
        }
    }
}

module.exports = inv;
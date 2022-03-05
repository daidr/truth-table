grammar Logic;

prog: expr | EOF;

expr:
	op = REVERSE expr				# Reverse
	| expr op = CONJUNCTION expr	# Conjunction
	| expr op = DISJUNCTION expr	# Disjunction
	| expr op = IMPLICATION expr	# Implication
	| expr op = EQUIVALENCE expr	# Equivalence
	| VAR							# Variable
	| '(' expr ')'					# Par;

VAR: [a-zA-Z]+;
REVERSE: '\u00AC';
CONJUNCTION: '\u22C0';
DISJUNCTION: '\u22C1';
IMPLICATION: '\u2192';
EQUIVALENCE: '\u21D4';
WS: [ \t\r\n]+ -> skip;
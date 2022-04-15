grammar Logic;

prog: expr | EOF;

expr:
	op = REVERSE expr								# Reverse
	| expr op = CONJUNCTION expr					# Conjunction
	| expr op = DISJUNCTION expr					# Disjunction
	| <assoc = right> expr op = IMPLICATION expr	# Implication
	| expr op = EQUIVALENCE expr					# Equivalence
	| VAR											# Variable
	| LEFT_PAR expr RIGHT_PAR						# Par;

LEFT_PAR: '(';
RIGHT_PAR: ')';
VAR: [a-zA-Z]+[0-9]?;
REVERSE: '\u00AC';
CONJUNCTION: '\u22C0';
DISJUNCTION: '\u22C1';
IMPLICATION: '\u2192';
EQUIVALENCE: '\u21D4';
WS: [ \t\r\n]+ -> skip;
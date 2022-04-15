// Generated from Logic.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';



const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0002\u000b2\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003",
    "\u0004\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007",
    "\t\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0003\u0002\u0003\u0002",
    "\u0003\u0003\u0003\u0003\u0003\u0004\u0006\u0004\u001b\n\u0004\r\u0004",
    "\u000e\u0004\u001c\u0003\u0004\u0005\u0004 \n\u0004\u0003\u0005\u0003",
    "\u0005\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\b\u0003",
    "\b\u0003\t\u0003\t\u0003\n\u0006\n-\n\n\r\n\u000e\n.\u0003\n\u0003\n",
    "\u0002\u0002\u000b\u0003\u0003\u0005\u0004\u0007\u0005\t\u0006\u000b",
    "\u0007\r\b\u000f\t\u0011\n\u0013\u000b\u0003\u0002\u0005\u0004\u0002",
    "C\\c|\u0003\u00022;\u0005\u0002\u000b\f\u000f\u000f\"\"\u00024\u0002",
    "\u0003\u0003\u0002\u0002\u0002\u0002\u0005\u0003\u0002\u0002\u0002\u0002",
    "\u0007\u0003\u0002\u0002\u0002\u0002\t\u0003\u0002\u0002\u0002\u0002",
    "\u000b\u0003\u0002\u0002\u0002\u0002\r\u0003\u0002\u0002\u0002\u0002",
    "\u000f\u0003\u0002\u0002\u0002\u0002\u0011\u0003\u0002\u0002\u0002\u0002",
    "\u0013\u0003\u0002\u0002\u0002\u0003\u0015\u0003\u0002\u0002\u0002\u0005",
    "\u0017\u0003\u0002\u0002\u0002\u0007\u001a\u0003\u0002\u0002\u0002\t",
    "!\u0003\u0002\u0002\u0002\u000b#\u0003\u0002\u0002\u0002\r%\u0003\u0002",
    "\u0002\u0002\u000f\'\u0003\u0002\u0002\u0002\u0011)\u0003\u0002\u0002",
    "\u0002\u0013,\u0003\u0002\u0002\u0002\u0015\u0016\u0007*\u0002\u0002",
    "\u0016\u0004\u0003\u0002\u0002\u0002\u0017\u0018\u0007+\u0002\u0002",
    "\u0018\u0006\u0003\u0002\u0002\u0002\u0019\u001b\t\u0002\u0002\u0002",
    "\u001a\u0019\u0003\u0002\u0002\u0002\u001b\u001c\u0003\u0002\u0002\u0002",
    "\u001c\u001a\u0003\u0002\u0002\u0002\u001c\u001d\u0003\u0002\u0002\u0002",
    "\u001d\u001f\u0003\u0002\u0002\u0002\u001e \t\u0003\u0002\u0002\u001f",
    "\u001e\u0003\u0002\u0002\u0002\u001f \u0003\u0002\u0002\u0002 \b\u0003",
    "\u0002\u0002\u0002!\"\u0007\u00ae\u0002\u0002\"\n\u0003\u0002\u0002",
    "\u0002#$\u0007\u22c2\u0002\u0002$\f\u0003\u0002\u0002\u0002%&\u0007",
    "\u22c3\u0002\u0002&\u000e\u0003\u0002\u0002\u0002\'(\u0007\u2194\u0002",
    "\u0002(\u0010\u0003\u0002\u0002\u0002)*\u0007\u21d6\u0002\u0002*\u0012",
    "\u0003\u0002\u0002\u0002+-\t\u0004\u0002\u0002,+\u0003\u0002\u0002\u0002",
    "-.\u0003\u0002\u0002\u0002.,\u0003\u0002\u0002\u0002./\u0003\u0002\u0002",
    "\u0002/0\u0003\u0002\u0002\u000201\b\n\u0002\u00021\u0014\u0003\u0002",
    "\u0002\u0002\u0006\u0002\u001c\u001f.\u0003\b\u0002\u0002"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

export default class LogicLexer extends antlr4.Lexer {

    static grammarFileName = "Logic.g4";
    static channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	static modeNames = [ "DEFAULT_MODE" ];
	static literalNames = [ null, "'('", "')'", null, "'\u00AC'", "'\u22C0'", 
                         "'\u22C1'", "'\u2192'", "'\u21D4'" ];
	static symbolicNames = [ null, "LEFT_PAR", "RIGHT_PAR", "VAR", "REVERSE", 
                          "CONJUNCTION", "DISJUNCTION", "IMPLICATION", "EQUIVALENCE", 
                          "WS" ];
	static ruleNames = [ "LEFT_PAR", "RIGHT_PAR", "VAR", "REVERSE", "CONJUNCTION", 
                      "DISJUNCTION", "IMPLICATION", "EQUIVALENCE", "WS" ];

    constructor(input) {
        super(input)
        this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    }

    get atn() {
        return atn;
    }
}

LogicLexer.EOF = antlr4.Token.EOF;
LogicLexer.LEFT_PAR = 1;
LogicLexer.RIGHT_PAR = 2;
LogicLexer.VAR = 3;
LogicLexer.REVERSE = 4;
LogicLexer.CONJUNCTION = 5;
LogicLexer.DISJUNCTION = 6;
LogicLexer.IMPLICATION = 7;
LogicLexer.EQUIVALENCE = 8;
LogicLexer.WS = 9;




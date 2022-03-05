// Generated from Logic.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';
import LogicListener from './LogicListener.js';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003\u000b&\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0003\u0002",
    "\u0003\u0002\u0005\u0002\t\n\u0002\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003",
    "\u0013\n\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0007\u0003!\n\u0003\f\u0003\u000e\u0003$\u000b\u0003",
    "\u0003\u0003\u0002\u0003\u0004\u0004\u0002\u0004\u0002\u0002\u0002*",
    "\u0002\b\u0003\u0002\u0002\u0002\u0004\u0012\u0003\u0002\u0002\u0002",
    "\u0006\t\u0005\u0004\u0003\u0002\u0007\t\u0007\u0002\u0002\u0003\b\u0006",
    "\u0003\u0002\u0002\u0002\b\u0007\u0003\u0002\u0002\u0002\t\u0003\u0003",
    "\u0002\u0002\u0002\n\u000b\b\u0003\u0001\u0002\u000b\f\u0007\u0006\u0002",
    "\u0002\f\u0013\u0005\u0004\u0003\t\r\u0013\u0007\u0005\u0002\u0002\u000e",
    "\u000f\u0007\u0003\u0002\u0002\u000f\u0010\u0005\u0004\u0003\u0002\u0010",
    "\u0011\u0007\u0004\u0002\u0002\u0011\u0013\u0003\u0002\u0002\u0002\u0012",
    "\n\u0003\u0002\u0002\u0002\u0012\r\u0003\u0002\u0002\u0002\u0012\u000e",
    "\u0003\u0002\u0002\u0002\u0013\"\u0003\u0002\u0002\u0002\u0014\u0015",
    "\f\b\u0002\u0002\u0015\u0016\u0007\u0007\u0002\u0002\u0016!\u0005\u0004",
    "\u0003\t\u0017\u0018\f\u0007\u0002\u0002\u0018\u0019\u0007\b\u0002\u0002",
    "\u0019!\u0005\u0004\u0003\b\u001a\u001b\f\u0006\u0002\u0002\u001b\u001c",
    "\u0007\t\u0002\u0002\u001c!\u0005\u0004\u0003\u0007\u001d\u001e\f\u0005",
    "\u0002\u0002\u001e\u001f\u0007\n\u0002\u0002\u001f!\u0005\u0004\u0003",
    "\u0006 \u0014\u0003\u0002\u0002\u0002 \u0017\u0003\u0002\u0002\u0002",
    " \u001a\u0003\u0002\u0002\u0002 \u001d\u0003\u0002\u0002\u0002!$\u0003",
    "\u0002\u0002\u0002\" \u0003\u0002\u0002\u0002\"#\u0003\u0002\u0002\u0002",
    "#\u0005\u0003\u0002\u0002\u0002$\"\u0003\u0002\u0002\u0002\u0006\b\u0012",
    " \""].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class LogicParser extends antlr4.Parser {

    static grammarFileName = "Logic.g4";
    static literalNames = [ null, "'('", "')'", null, "'\u00AC'", "'\u22C0'", 
                            "'\u22C1'", "'\u2192'", "'\u21D4'" ];
    static symbolicNames = [ null, null, null, "VAR", "REVERSE", "CONJUNCTION", 
                             "DISJUNCTION", "IMPLICATION", "EQUIVALENCE", 
                             "WS" ];
    static ruleNames = [ "prog", "expr" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = LogicParser.ruleNames;
        this.literalNames = LogicParser.literalNames;
        this.symbolicNames = LogicParser.symbolicNames;
    }

    get atn() {
        return atn;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 1:
    	    		return this.expr_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    expr_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 6);
    		case 1:
    			return this.precpred(this._ctx, 5);
    		case 2:
    			return this.precpred(this._ctx, 4);
    		case 3:
    			return this.precpred(this._ctx, 3);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	prog() {
	    let localctx = new ProgContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, LogicParser.RULE_prog);
	    try {
	        this.state = 6;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LogicParser.T__0:
	        case LogicParser.VAR:
	        case LogicParser.REVERSE:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 4;
	            this.expr(0);
	            break;
	        case LogicParser.EOF:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 5;
	            this.match(LogicParser.EOF);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	expr(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ExprContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 2;
	    this.enterRecursionRule(localctx, 2, LogicParser.RULE_expr, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 16;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LogicParser.REVERSE:
	            localctx = new ReverseContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 9;
	            localctx.op = this.match(LogicParser.REVERSE);
	            this.state = 10;
	            this.expr(7);
	            break;
	        case LogicParser.VAR:
	            localctx = new VariableContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 11;
	            this.match(LogicParser.VAR);
	            break;
	        case LogicParser.T__0:
	            localctx = new ParContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 12;
	            this.match(LogicParser.T__0);
	            this.state = 13;
	            this.expr(0);
	            this.state = 14;
	            this.match(LogicParser.T__1);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 32;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,3,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 30;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new ConjunctionContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LogicParser.RULE_expr);
	                    this.state = 18;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 19;
	                    localctx.op = this.match(LogicParser.CONJUNCTION);
	                    this.state = 20;
	                    this.expr(7);
	                    break;

	                case 2:
	                    localctx = new DisjunctionContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LogicParser.RULE_expr);
	                    this.state = 21;
	                    if (!( this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                    }
	                    this.state = 22;
	                    localctx.op = this.match(LogicParser.DISJUNCTION);
	                    this.state = 23;
	                    this.expr(6);
	                    break;

	                case 3:
	                    localctx = new ImplicationContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LogicParser.RULE_expr);
	                    this.state = 24;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 25;
	                    localctx.op = this.match(LogicParser.IMPLICATION);
	                    this.state = 26;
	                    this.expr(5);
	                    break;

	                case 4:
	                    localctx = new EquivalenceContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LogicParser.RULE_expr);
	                    this.state = 27;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 28;
	                    localctx.op = this.match(LogicParser.EQUIVALENCE);
	                    this.state = 29;
	                    this.expr(4);
	                    break;

	                } 
	            }
	            this.state = 34;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,3,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}


}

LogicParser.EOF = antlr4.Token.EOF;
LogicParser.T__0 = 1;
LogicParser.T__1 = 2;
LogicParser.VAR = 3;
LogicParser.REVERSE = 4;
LogicParser.CONJUNCTION = 5;
LogicParser.DISJUNCTION = 6;
LogicParser.IMPLICATION = 7;
LogicParser.EQUIVALENCE = 8;
LogicParser.WS = 9;

LogicParser.RULE_prog = 0;
LogicParser.RULE_expr = 1;

class ProgContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LogicParser.RULE_prog;
    }

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	EOF() {
	    return this.getToken(LogicParser.EOF, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterProg(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitProg(this);
		}
	}


}



class ExprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LogicParser.RULE_expr;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class ParContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterPar(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitPar(this);
		}
	}


}

LogicParser.ParContext = ParContext;

class DisjunctionContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        this.op = null; // Token;
        super.copyFrom(ctx);
    }

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	DISJUNCTION() {
	    return this.getToken(LogicParser.DISJUNCTION, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterDisjunction(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitDisjunction(this);
		}
	}


}

LogicParser.DisjunctionContext = DisjunctionContext;

class VariableContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	VAR() {
	    return this.getToken(LogicParser.VAR, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterVariable(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitVariable(this);
		}
	}


}

LogicParser.VariableContext = VariableContext;

class ReverseContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        this.op = null; // Token;
        super.copyFrom(ctx);
    }

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	REVERSE() {
	    return this.getToken(LogicParser.REVERSE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterReverse(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitReverse(this);
		}
	}


}

LogicParser.ReverseContext = ReverseContext;

class EquivalenceContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        this.op = null; // Token;
        super.copyFrom(ctx);
    }

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	EQUIVALENCE() {
	    return this.getToken(LogicParser.EQUIVALENCE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterEquivalence(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitEquivalence(this);
		}
	}


}

LogicParser.EquivalenceContext = EquivalenceContext;

class ConjunctionContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        this.op = null; // Token;
        super.copyFrom(ctx);
    }

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	CONJUNCTION() {
	    return this.getToken(LogicParser.CONJUNCTION, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterConjunction(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitConjunction(this);
		}
	}


}

LogicParser.ConjunctionContext = ConjunctionContext;

class ImplicationContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        this.op = null; // Token;
        super.copyFrom(ctx);
    }

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	IMPLICATION() {
	    return this.getToken(LogicParser.IMPLICATION, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterImplication(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitImplication(this);
		}
	}


}

LogicParser.ImplicationContext = ImplicationContext;


LogicParser.ProgContext = ProgContext; 
LogicParser.ExprContext = ExprContext; 

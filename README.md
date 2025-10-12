# #808080

## Category

CRYPTOGRAPHY

## Description

FLAG FORMAT : CTF{...}

## Solution

### WHAT IS IT?

It is a encoding method that is based on actual gray code which we are calling GREY code

Char	|	Number      |	GREY
A		|		0		|	00110	
B		|		1		|	00111
C		|		2		|	00101
D		|		3		|	00100
E		|		4		|	01100
F		|		5		|	01101
G		|		6		|	01111
H		|		7		|	01110
I		|		8		|	01010
J		|		9		|	01011
K		|		10		|	01001
L		|		11		|	01000
M		|		12		|	11000
N		|		13		|	11001
O		|		14		|	11011
P		|		15		|	11010
Q		|		16		|	11110
R		|		17		|	11111
S		|		18		|	11101
T		|		19		|	11100
U		|		20		|	10100
V		|		21		|	10101
W		|		22		|	10111
X		|		23		|	10110
Y		|		24		|	10010
Z		|		25		|	10011
@		|		26		|	10001
#		|		27		|	10000
_		|		28		|	00000
{		|		29		|	00001
}		|		30		|	00011
&		|		31		|	00010

According to this table we can see each character and its binary code 
this encoding format is cyclic and they differ by only 1 bit following gray code format 
there are 31 other ways this can formed which includes gray code too so it will difficult to figure it out

`## FLAG

`CTF{GREY&CODE#GOES_VERY_H@RD}`

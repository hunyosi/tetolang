#include "vm.h"

#include <stdlib.h>


struct Vm *Vm_new(VmUi32 memSize)
{
	struct Vm *obj;
	obj = calloc(sizeof(struct Vm), 1);
	if (!obj) return NULL;
	obj->mem = calloc(1, memSize);
	obj->memSize = memSize;
	obj->sp = memSize;
	obj->bp = memSize;
	obj->pc = 0;
	return obj;
}


void Vm_delete(struct Vm *vm)
{
	if (vm == NULL) return;
	free(vm->mem);
	free(vm);
}

#define loadUi8(dst, mem, idx) \
	((dst) = *((VmUi8 *)&(mem)[idx]))

#define storeUi8(mem, idx, src) \
	(*((VmUi8 *)&(mem)[idx]) = (src))

#define loadUi32(dst, mem, idx) \
	((dst) = *((VmUi32 *)&(mem)[idx]))

#define storeUi32(mem, idx, src) \
	(*((VmUi32 *)&(mem)[idx]) = (src))

#define pushUi32(mem, sp, src) \
{	\
	(sp) -= 4;	\
	storeUi32(mem, sp, src);	\
}

#define popUi32(dst, mem, sp) \
{	\
	loadUi32(dst, mem, sp);	\
	(sp) += 4;	\
}

#define storeVmStat(vmptr) \
{	\
	struct Vm *vmp = (struct Vm *)(vmptr);	\
	vmp->mem = mem;	\
	vmp->memSize = memSize;	\
	vmp->pc = pc;	\
	vmp->sp = sp;	\
	vmp->bp = bp;	\
	vmp->svc = svc;	\
}

#define loadVmStat(vmptr) \
{	\
	struct Vm *vmp = (struct Vm *)(vmptr);	\
	mem = vmp->mem;	\
	memSize = vmp->memSize;	\
	pc = vmp->pc;	\
	sp = vmp->sp;	\
	bp = vmp->bp;	\
	src = vmp->svc;	\
}

#define loadAsType(dst, type, mem, pos) \
{ \
}

#define loadOperand(dst, type, attr, mem, pos) \
{ \
	unsigned typeVal = (type); \
	unsigned attrVal = (attr); \
	VmUi
	unsigned mode = (attrVal >> 2) & 0x03; \
	union VmVal val = 0; \
	switch (attrVal & 0x03) { \
	case 0: \
		switch (mode) {
		case 0x00: loadUi8(val.ui8, mem, pos); break;
		case 0x01:
			loadUi8(val.ui8, mem, pos);
			loadAsType(val, typeVal, mem, val.addr);
			break;
		default:

		}
		++(pos);
		break;
	case 1:
		break;
	case 2:
		break;
	default:
		loadUi32((dst).ui32, mem, pos);
		++(pos);
		break;
	}
}


/*
11oooooo ttttaaxx bbyycczz operand1... operand2... operand3...
10oooooo ttttaaxx bbyyssss operand1... operand2...
01oooooo ttttaaxx operand1...
00oooooo

oooooo: operation code
tttt: type (case of 10oooooo: type of operand1)
ssss: type of operand2
aa: mode of operand1
bb: mode of operand2
cc: mode of operand3
xx: length of operand1
yy: length of operand2
zz: length of operand3

mode: 00=imm (*), 01=global addr, 10=local addr. 11=indirect addr
    (* case of destination: special mode (depedence on operation))
length: 00=1 byte, 01=2 bytes, 10=4 bytes, 11=8 bytes
type:
    0000=unsigned integer 1 byte  ( 8 bits)
    0001=unsigned integer 2 bytes (16 bits)
    0010=unsigned integer 4 bytes (32 bits)
    0011=unsigned integer 8 bytes (64 bits)
    0100=signed integer 1 byte  ( 8 bits)
    0101=signed integer 2 bytes (16 bits)
    0110=signed integer 4 bytes (32 bits)
    0111=signed integer 8 bytes (64 bits)
    1000=single float (32 bits)
    1001=double float (64 bits)
    1010=reserved (long double float (80 bits))
    1011=reserved
    1100=reserved
    1101=reserved
    1110=reserved
    1111=address (32 bites / 64 bits)
*/
int Vm_run(struct Vm *vm, int numOfSteps)
{
	int	status	= 0;
	int	stepCnt	= 0;
	VmUi32	pc;
	VmUi32	sp;
	VmUi32	bp;
	VmUi8	*mem	= vm->mem;
	VmUi32	memSize	= vm->memSize;
	int	inst;
	int	operand1;
	int	operand2;
	int	operand3;
	

	loadVmStat(vm);

	for (;;) {
		if (numOfSteps >= 0) {
			++ stepCnt;
			if (stepCnt > numOfSteps) break;
		}

		inst = mem[pc];
		++pc;

		switch (inst >> 6) {
		case 0:
			switch (inst & 0x3F) {
			case 0x00:
				break;

			case 0x01:
				status = 1;
				goto finalize;

			default:
				status = 2;
				goto finalize;
			}
			break;

		case 1:
			switch (inst & 0x3F) {
			case 0x02:
				param = mem[pc];
				++pc;
				if (!vm->svc[operand1]) break;
				pushUi32(mem, sp, pc);
				storeVmStat(vm);
				vm->svc[oprenad1](vm);
				loadVmStat(vm);
				popUi32(pc, mem, sp);
				break;

			default:
				status = 2;
				goto finalize;
			}
			break;

		
	}

finalize:
	storeVmStat(vm);
	return status;
}

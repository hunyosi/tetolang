#ifndef VM_H
#define VM_H

typedef unsigned long	VmUi32;
typedef signed long	VmSi32;
typedef unsigned char	VmUi8;
typedef signed char	VmSi8;

union VmVal {
	VmUi32	ui32;
	VmSi32	si32;
	VmUi8	ui8;
	VmSi8	si8;
	VmUi32	addr;
};

#define VM_NUMOFSVCS 256

struct Vm;

typedef int (*VmSvc)(struct Vm *vm);

struct Vm {
	VmUi8	*mem;
	VmUi32	memSize;
	VmUi32	pc;
	VmUi32	sp;
	VmUi32	bp;
	VmSvc	svc[VM_NUMOFSVCS];
};

struct Vm *Vm_new(VmUi32 memSize);
void Vm_delete(struct Vm *vm);
int Vm_run(struct Vm *vm, int numOfSteps);


/*
foo:fn(a:int(32), b:int(32), c:int(32))=>int(32){
    d:var int(32);
    e:var int(32);

    e = bar(1, 2);

}

ret_addr
bp
ret_val
2
1
d
e
ret_addr
bp
ret_val
a
b
c
*/

#endif

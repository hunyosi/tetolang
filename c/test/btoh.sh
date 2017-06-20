#!/bin/sh

if [ ! \( \( -e 'btoh'  \) -o \( -e 'btoh.exe' \) \) ] ; then
	cc -o btoh btoh.c
fi

./btoh $1


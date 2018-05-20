#!/usr/bin/python3
# coding: utf8
from openpyxl import load_workbook

wb = load_workbook(filename='produits.xlsx', read_only=True)
# Extraire le classeur actif
ws = wb.active

title = 'Produits et versions'
print(title)
for i in title:
    print('=', end='')
print('\n')

dianthus = ws['A1'].value
print(dianthus)
for i in dianthus:
    print('-', end='')
print('\n')
for row in ws.iter_rows(min_col=1, max_col=1, min_row=2, max_row=4):
    for cell in row:
        print('- ' + cell.value)

geum = ws['B1'].value
print('\n' + geum)
for i in geum:
    print('-', end='')
print('\n')
for row in ws.iter_rows(min_col=2, max_col=2, min_row=2, max_row=4):
    for cell in row:
        print('- ' + cell.value)

prunus = ws['C1'].value
print('\n' + prunus)
for i in prunus:
    print('-', end='')
print('\n')
for row in ws.iter_rows(min_col=3, max_col=3, min_row=2, max_row=4):
    for cell in row:
        print('- ' + cell.value)

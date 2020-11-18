#include <stdio.h>

int k;
int j;
int *ptr;

int main()
{
  k = 10;
  j = 13;

  ptr = &j;

  printf("\n");
  printf("j has the value %d and is stored at %p\n", j, &j);
  printf("k has the value %d and is stored at %p\n", k, (void *)&k);
  printf("ptr has the value %p and is stored at %p\n", ptr, (void *)&ptr);
  printf("The value of the integer pointed to by ptr is %d\n", *ptr);
}

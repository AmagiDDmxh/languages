#include <cs50.h>
#include <stdio.h>

int main(int argc, string argv[])
{
  printf("%d\n", argc);
  for (int i = 1; i < argc; i++)
  {
      printf("%s\n", argv[i]);
  }
  printf("\n");
}

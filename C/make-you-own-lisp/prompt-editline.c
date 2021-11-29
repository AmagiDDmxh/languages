#include <stdio.h>
#include <stdlib.h>

#include <editline/readline.h>

int main(int argc, char **argv)
{

  /* Print Version and Exit Information */
  puts("lispa Version 0.0.0.0.2");
  puts("Press Ctrl+c to Exit\n");

  /* In a never ending loop */
  while (1)
  {
    char *input = readline("lispa:> ");

    add_history(input);

    printf("No you're a %s\n", input);

    free(input);
  }
}

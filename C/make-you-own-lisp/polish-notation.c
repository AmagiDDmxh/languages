#include "mpc.h"

#ifdef _WIN32

static char buffer[2048];

char* readline(char* prompt) {
  fputs(prompt, stdout);
  fgets(buffer, 2048, stdin);
  char* cpy = malloc(strlen(buffer)+1);
  strcpy(cpy, buffer);
  cpy[strlen(cpy)-1] = '\0';
  return cpy;
}

void add_history(char* unused) {}

#else

#include <editline/readline.h>

  #ifdef __linux__
  #include <editline/history.h>
  #endif

#endif

long eval_op(long x, char* op, long y) {
  if (strcmp(op, "+") == 0) return x + y;
  if (strcmp(op, "-") == 0) return x - y;
  if (strcmp(op, "*") == 0) return x * y;
  if (strcmp(op, "/") == 0) return x / y;
  return 0;
}

long eval(mpc_ast_t* t) {
  if (strstr(t->tag, "number")) {
    return atoi(t->contents);
  }

  char* op = t->children[1]->contents;

  long x = eval(t->children[2]);

  int i = 3;
  while (strstr(t->children[i]->tag, "expression")) {
    x = eval_op(x, op, eval(t->children[i++]));
  }

  return x;
}

void print_ast(mpc_ast_t* t, int level, int index) {
  printf("\n-------------------\n");
  printf("Level: %d\n", level);
  printf("Index: %d\n", index);
  printf("Tag: %s\nContents: %s\n", t->tag, t->contents);

  if (t->children_num) {
    for (int i = 0; i < t->children_num; i++) {
      print_ast(t->children[i], level + 1, i);
    }
  }
}

int main(int argc, char **argv)
{

  mpc_parser_t* Number = mpc_new("number");
  mpc_parser_t* Operator = mpc_new("operator");
  mpc_parser_t* Expression = mpc_new("expression");
  mpc_parser_t* Lispa = mpc_new("lispa");

  mpca_lang(MPCA_LANG_DEFAULT,
    " number: /-?[0-9]+/ ;\
      operator: '+' | '-' | '*' | '/' | '%' | \"add\" | \"sub\" | \"mul\" | \"div\" ;\
      expression: <number> | '(' <operator> <expression>+ ')' ;\
      lispa: /^/ <operator> <expression>+ /$/ ;\
    ",
    Number, Operator, Expression, Lispa
  );

  /* Print Version and Exit Information */
  puts("lispa Version 0.0.0.0.3");
  puts("Press Ctrl+c to Exit\n");

  /* In a never ending loop */
  while (1)
  {
    char *input = readline("lispa:> ");
    add_history(input);

    mpc_result_t r;
    if (mpc_parse("<stdin>", input, Lispa, &r)) {
      mpc_ast_t* input = r.output;
      // print_ast(input, 0, 0);
      // mpc_ast_print(input);
      printf("%li\n", eval(input));
      mpc_ast_delete(input);
    } else {
      mpc_err_print(r.error);
      mpc_err_delete(r.error);
    }

    free(input);
  }

  mpc_cleanup(4, Number, Operator, Expression, Lispa);

  return 0;
}

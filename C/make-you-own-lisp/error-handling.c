#include "mpc.h"

#ifdef _WIN32

static char buffer[2048];

char *readline(char *prompt)
{
  fputs(prompt, stdout);
  fgets(buffer, 2048, stdin);
  char *cpy = malloc(strlen(buffer) + 1);
  strcpy(cpy, buffer);
  cpy[strlen(cpy) - 1] = '\0';
  return cpy;
}

void add_history(char *unused) {}

#else

#include <editline/readline.h>

#ifdef __linux__
#include <editline/history.h>
#endif

#endif

enum
{
  LVAL_ERROR,
  LVAL_NUM
};
enum
{
  LERR_DIV_ZERO,
  LERR_BAD_OP,
  LERR_BAD_NUM
};

typedef struct
{
  int type;
  long num;
  int error;
} lval;

lval make_lval_num(long x)
{
  lval v;
  v.type = LVAL_NUM;
  v.num = x;
  return v;
}

lval make_lval_err(int error)
{
  lval v;
  v.type = LVAL_ERROR;
  v.error = error;
  return v;
}

char *get_lval_error(int error)
{
  switch (error)
  {
  case LERR_BAD_NUM:
    return "Invalid number!";
  case LERR_BAD_OP:
    return "Invalid operator!";
  case LERR_DIV_ZERO:
    return "Division by zero!";

  default:
    return "Unknown Error!";
  }
}

void lval_print(lval v)
{
  switch (v.type)
  {
  case LVAL_NUM:
    printf("%li", v.num);
    break;

  case LVAL_ERROR:
    printf("Error: %s", get_lval_error(v.error));
    break;
  }
}

void lval_println(lval v)
{
  lval_print(v);
  putchar('\n');
}

lval eval_op(lval x, char *op, lval y)
{
  if (strcmp(op, "+") == 0)
    return make_lval_num(x.num + y.num);
  if (strcmp(op, "-") == 0)
    return make_lval_num(x.num - y.num);
  if (strcmp(op, "*") == 0)
    return make_lval_num(x.num * y.num);

  if (strcmp(op, "/") == 0)
    return y.num == 0
               ? make_lval_err(LERR_DIV_ZERO)
               : make_lval_num(x.num / y.num);

  return make_lval_err(LERR_BAD_OP);
}

lval eval(mpc_ast_t *t)
{
  if (strstr(t->tag, "number"))
  {
    errno = 0;
    long x = strtol(t->contents, NULL, 10);
    return errno != ERANGE
               ? make_lval_num(x)
               : make_lval_err(LERR_BAD_NUM);
  }

  char *op = t->children[1]->contents;
  lval x = eval(t->children[2]);

  int i = 3;
  while (strstr(t->children[i]->tag, "expression"))
  {
    x = eval_op(x, op, eval(t->children[i]));
    i++;
  }

  return x;
}

void print_ast(mpc_ast_t *t, int level, int index)
{
  printf("\n-------------------\n");
  printf("Level: %d\n", level);
  printf("Index: %d\n", index);
  printf("Tag: %s\nContents: %s\n", t->tag, t->contents);

  if (t->children_num)
  {
    for (int i = 0; i < t->children_num; i++)
    {
      print_ast(t->children[i], level + 1, i);
    }
  }
}

int main(int argc, char **argv)
{

  mpc_parser_t *Number = mpc_new("number");
  mpc_parser_t *Operator = mpc_new("operator");
  mpc_parser_t *Expression = mpc_new("expression");
  mpc_parser_t *Lispa = mpc_new("lispa");

  mpca_lang(MPCA_LANG_DEFAULT,
            " number: /-?[0-9]+/ ;\
      operator: '+' | '-' | '*' | '/' | '%' | \"add\" | \"sub\" | \"mul\" | \"div\" ;\
      expression: <number> | '(' <operator> <expression>+ ')' ;\
      lispa: /^/ <operator> <expression>+ /$/ ;\
    ",
            Number, Operator, Expression, Lispa);

  /* Print Version and Exit Information */
  puts("lispa Version 0.0.0.0.3");
  puts("Press Ctrl+c to Exit\n");

  /* In a never ending loop */
  while (1)
  {
    char *input = readline("lispa:> ");
    add_history(input);

    mpc_result_t r;
    if (mpc_parse("<stdin>", input, Lispa, &r))
    {
      mpc_ast_t *input = r.output;
      // print_ast(input, 0, 0);
      // mpc_ast_print(input);
      lval result = eval(input);
      lval_println(result);
      mpc_ast_delete(input);
    }
    else
    {
      mpc_err_print(r.error);
      mpc_err_delete(r.error);
    }

    free(input);
  }

  mpc_cleanup(4, Number, Operator, Expression, Lispa);

  return 0;
}

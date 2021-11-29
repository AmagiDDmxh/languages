// First attempt

void first_attempt() {
  mpc_parser_t *Adjective = mpc_or(4,
                                 mpc_sym("wow"), mpc_sym("many"),
                                 mpc_sym("so"), mpc_sym("such"));

  mpc_parser_t *Noun = mpc_or(4,
                              mpc_sym("wow"), mpc_sym("many"),
                              mpc_sym("so"), mpc_sym("such"));

  mpc_parser_t *Phrase = mpc_and(2, mpcf_strfold, Adjective, Noun, free);

  mpc_parser_t *Doge = mpc_many(mpcf_strfold, Phrase);

  mpc_delete(Doge);
}



// Second attempt

void second_attempt() {
  mpc_parser_t *Adjective = mpc_new("adjective");
  mpc_parser_t *Noun = mpc_new("noun");
  mpc_parser_t *Phrase = mpc_new("phrase");
  mpc_parser_t *Doge = mpc_new("doge");

  mpca_lang(MPCA_LANG_DEFAULT,
    " adjective : \"wow\" | \"many\"            \
                | \"so\"  | \"such\";           \
      noun      : \"lisp\" | \"language\"       \
                | \"book\" | \"build\" | \"c\"; \
      phrase    : <adjective> <noun>;           \
      doge      : <phrase>*;                    \
    ",
    Adjective, Noun, Phrase, Doge);

  mpc_cleanup(4, Adjective, Noun, Phrase, Doge);
}

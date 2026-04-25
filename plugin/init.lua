vim.filetype.add({ extension = { diamond = "di" } })

vim.api.nvim_create_autocmd("FileType", {
    pattern = "diamond",
    callback = function(event) vim.bo[event.buf].commentstring = "# %s" end,
})

require("nvim-treesitter.parsers").get_parser_configs().poryscript = {
    install_info = {
        url = "https://github.com/Elsie19/diamond-grammar",
        files = { "src/parser.c" },
        branch = "master",
        requires_generate_from_grammar = false,
    },
    filetype = "di",
}

vim.treesitter.language.register('diamond', 'di')

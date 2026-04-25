vim.filetype.add({
    extension = {
        di = "di",
    },
})

vim.treesitter.language.register('diamond', { 'di' })

vim.api.nvim_create_autocmd("FileType", {
    pattern = "*.di",
    callback = function(event) vim.bo[event.buf].commentstring = "# %s" end,
})

require("nvim-treesitter.parsers").get_parser_configs().diamond = {
    install_info = {
        url = "https://github.com/Elsie19/diamond-grammar",
        files = { "src/parser.c" },
        branch = "master",
    },
    filetype = "di",
}

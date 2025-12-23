class StackItemsController < ApplicationController
    def index
      stack_items = {
        main: StackItem.main.map { |item| format_item(item) },
        familiar: StackItem.familiar.map { |item| format_item(item) },
        tools: StackItem.tools.map { |item| format_tool(item) }
      }
  
      render json: stack_items, status: :ok
    end
  
    private
  
    def format_item(item)
      {
        id: item.id,
        name: item.name,
        icon: item.icon,
        level: item.level
      }
    end
  
    def format_tool(item)
      {
        id: item.id,
        name: item.name,
        icon: item.icon
      }
    end
  end
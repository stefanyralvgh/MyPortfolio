class Admin::StackItemsController < AdminController
    def index
      stack_items = StackItem.all.order(:category, :position)
      render json: stack_items, status: :ok
    end
  
    def show
      stack_item = StackItem.find(params[:id])
      render json: stack_item, status: :ok
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Stack item not found' }, status: :not_found
    end
  
    def create
      stack_item = StackItem.new(stack_item_params)
      
      if stack_item.save
        render json: stack_item, status: :created
      else
        render json: { errors: stack_item.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def update
      stack_item = StackItem.find(params[:id])
      
      if stack_item.update(stack_item_params)
        render json: stack_item, status: :ok
      else
        render json: { errors: stack_item.errors.full_messages }, status: :unprocessable_entity
      end
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Stack item not found' }, status: :not_found
    end
  
    def destroy
      stack_item = StackItem.find(params[:id])
      stack_item.destroy
      render json: { message: 'Stack item deleted successfully' }, status: :ok
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Stack item not found' }, status: :not_found
    end
  
    private
  
    def stack_item_params
      params.require(:stack_item).permit(:name, :icon, :category, :level, :position)
    end
  end
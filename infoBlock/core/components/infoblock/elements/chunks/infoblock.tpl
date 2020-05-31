{foreach $positions as $position}
    {$position.title}
    <ul>
        {foreach $position.items as $item}
            <li>{$item.name}</li>
        {/foreach}
    </ul>
{/foreach}